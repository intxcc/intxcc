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
  years: types.array(types.number),
  selectedYear: types.optional(types.number, 0),
  selectedStory: types.reference(StoryModel),
  stories: types.array(StoryModel)
}).actions(self => {
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

  function onScroll (scrollTop) {
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
  }

  function selectYear (index) {
    self.selectedYear = index
  }

  return {
    setDiv,
    updateStoriesTop,
    onScroll,
    selectYear
  }
})

export default StoriesModel
