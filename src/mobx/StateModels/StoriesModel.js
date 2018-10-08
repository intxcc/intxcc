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
      if (rect.top < 0 && key !== keys(self.stories).length - 1) {
        story.top = rect.bottom
      } else {
        story.top = rect.top
      }
    }
  }

  function onScroll (scrollTop) {
    self.basicInfo.setScrollTop(scrollTop)
    self.updateStoriesTop()

    const windowHeightHalf = self.basicInfo.rootStore.global.clientHeight / 2

    let mostVisibleStoryKey = false
    let mostVisibleStoryTop = false
    for (let key of keys(self.stories)) {
      const story = self.stories.get(key)

      if (mostVisibleStoryKey === false) {
        mostVisibleStoryKey = key
        mostVisibleStoryTop = story.top
        continue
      }

      if (Math.abs(story.top - windowHeightHalf) < Math.abs(mostVisibleStoryTop - windowHeightHalf)) {
        mostVisibleStoryKey = key
        mostVisibleStoryTop = story.top
      }
    }

    if (mostVisibleStoryKey !== false) {
      self.selectedStory = self.stories.get(mostVisibleStoryKey)
    }

    if (Math.abs(mostVisibleStoryTop - windowHeightHalf) < 50 || (mostVisibleStoryTop - windowHeightHalf < 0 && Math.abs(mostVisibleStoryTop - windowHeightHalf) < 250)) {
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
