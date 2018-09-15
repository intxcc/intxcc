'use strict'

import { types } from 'mobx-state-tree'

import { BasicInfoModel } from '../model/ViewEntity'

const StoryModel = types.model({
  textName: types.string,
  summary: types.string
})

const StoriesModel = types.model({
  basicInfo: BasicInfoModel,
  years: types.array(types.number),
  selectedYear: types.optional(types.number, 0),
  stories: types.array(StoryModel)
}).actions(self => {
  function onScroll (scrollTop) {
    self.basicInfo.setScrollTop(scrollTop)

    if (self.basicInfo.viewEntity !== '') {
      if (self.basicInfo.scrollTop > 50) {
        self.basicInfo.viewEntity.changeModelVariant('ArticleFocusModel')
      } else {
        self.basicInfo.viewEntity.changeModelVariant('default')
      }
    }
  }

  function selectYear (index) {
    self.selectedYear = index
  }

  return {
    onScroll,
    selectYear
  }
})

export default StoriesModel
