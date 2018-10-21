'use strict'

import { types, resolveIdentifier } from 'mobx-state-tree'
import { keys } from 'mobx'

import BasicInfoModel from '../model/BasicInfoModel'

const StoryModel = types.model({
  id: types.identifier,
  div: types.maybeNull(types.frozen()),
  top: types.optional(types.number, 0),
  textName: types.string,
  name: types.string,
  year: types.number,
  time: types.optional(types.string, ''),
  type: types.string,
  subType: types.optional(types.string, ''),
  skills: types.optional(types.array(types.string), []),
  summary: types.string
})

const StoriesModel = types.model({
  basicInfo: BasicInfoModel,
  routerParams: types.optional(types.map(types.string), {}),
  years: types.array(types.number),
  selectedYear: types.optional(types.number, 0),
  selectedStory: types.reference(StoryModel),
  storiesIndex: types.optional(types.map(types.string), {}),
  stories: types.array(StoryModel),
  ignoreScroll: types.optional(types.boolean, false)
}).actions(self => {
  function onRouterParamChange (paramName, paramValue) {
    self.routerParams.set(paramName, paramValue)

    switch (paramName) {
      case 'story_name':
        const storyIdentifier = 'story-' + paramValue
        self.selectStoryByIdentifier(storyIdentifier)
        break
    }
  }

  function selectStoryByIdentifier (storyIdentifier, isCallback = false) {
    // Show 404 if the skill does not exist and go to the skill with the id 0
    if (typeof storyIdentifier === 'undefined' || typeof resolveIdentifier(StoryModel, self.stories, storyIdentifier) === 'undefined') {
      self.selectStoryByIndex(0)

      // If there are no skills the skill identifier will be undefined, don't show 404 in this case
      if (typeof storyIdentifier !== 'undefined') {
        self.basicInfo.show404Popup()
      }

      return
    }

    // Always wait 100ms before selecting a story, so the app has time to tell us if the viewEntity, the stories are shown in is the buffer or not
    if (!isCallback) {
      setTimeout(() => self.selectStoryByIdentifier(storyIdentifier, true), 100)
      return
    }

    const storyIndex = self.storiesIndex.get(storyIdentifier)
    const story = self.stories.get(storyIndex)

    // If the divs were not initialized yes, wait at the end of the js event queue
    if (typeof story.div === 'undefined') {
      // Try again to get div at end of the js event loop
      setTimeout(() => self.selectStoryByIdentifier(storyIdentifier, true), 0)
      return
    }

    // Scroll to selected story and set it as selected
    self.selectedStory = story
    self.ignoreScrollForMs(2000)
    self.scrollToStory(story)
  }

  function selectStoryByIndex (index) {
    self.selectStoryByIdentifier(self.stories.get(index).id)
  }

  function setDiv (storyId, div) {
    if (div === null) {
      return
    }

    const story = resolveIdentifier(StoryModel, self.stories, storyId)
    if (typeof story === 'undefined') {
      return
    }

    story.div = div
  }

  function updateStoriesTop () {
    for (let key of keys(self.stories)) {
      const story = self.stories.get(key)
      const rect = story.div.getBoundingClientRect()
      story.top = rect.top
    }
  }

  function ignoreScrollForMs (timeoutMs, isCallback = false) {
    if (!isCallback) {
      self.ignoreScroll = true
      setTimeout(() => self.ignoreScrollForMs(0, true), timeoutMs)
    } else {
      self.ignoreScroll = false
    }
  }

  function onScroll (scrollTop) {
    if (self.ignoreScroll) {
      return
    }

    self.basicInfo.setScrollTop(scrollTop)
    self.updateStoriesTop()

    const marginTopValue = self.basicInfo.rootStore.global.clientHeight / 1.5

    let biggestNegativeTopKey = false
    let biggestNegativeTopValue = false
    // To select a story we get the one, from which the top is the smallest amount above position top 0
    for (let key of keys(self.stories)) {
      const story = self.stories.get(key)
      const storyTopWithMargin = story.top - marginTopValue
      if (storyTopWithMargin < 0) {
        if (biggestNegativeTopKey === false) {
          biggestNegativeTopKey = key
          biggestNegativeTopValue = storyTopWithMargin
        } else if (storyTopWithMargin > biggestNegativeTopValue) {
          biggestNegativeTopKey = key
          biggestNegativeTopValue = storyTopWithMargin
        }
      }
    }

    const oldSelectionId = self.selectedStory.id

    // If no top is negative we just select the first story
    if (biggestNegativeTopKey === false) {
      self.selectedStory = self.stories.get(keys(self.stories)[0])
    } else {
      self.selectedStory = self.stories.get(biggestNegativeTopKey)
    }

    if (Math.abs(biggestNegativeTopValue) < marginTopValue * 0.75 && Math.abs(biggestNegativeTopValue) > marginTopValue * 0.25) {
      self.basicInfo.viewEntity.changeModelVariant('default')
    } else {
      self.basicInfo.viewEntity.changeModelVariant('ArticleFocusModel')
    }

    if (oldSelectionId !== self.selectedStory.id && self.selectedStory.top > 0) {
      self.scrollToStory(self.selectedStory)
    }
  }

  function scrollToStory (story) {
    // If we scroll to the story top, always show the details view (that is the default)
    self.basicInfo.viewEntity.changeModelVariant('default')

    self.updateStoriesTop()
    const marginTopValue = self.basicInfo.rootStore.global.clientHeight / 1.5
    self.basicInfo.scrollBy(story.top - (marginTopValue / 1.5))
  }

  function selectYear (index) {
    self.selectedYear = index
  }

  return {
    onRouterParamChange,
    selectStoryByIdentifier,
    selectStoryByIndex,
    setDiv,
    updateStoriesTop,
    ignoreScrollForMs,
    onScroll,
    scrollToStory,
    selectYear
  }
})

export default StoriesModel
