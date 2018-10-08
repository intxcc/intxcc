'use strict'

import { types } from 'mobx-state-tree'

import BasicInfoModel from '../model/BasicInfoModel'

const StoryModel = types.model({
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
  stories: types.array(StoryModel)
}).actions(self => {
  function onScroll (scrollTop) {
    self.basicInfo.setScrollTop(scrollTop)

    // TODO REMOVE THIS SHOULD BE DONE BY THE ROUTER !!
    if (self.basicInfo.viewEntity !== '') {
      if (self.basicInfo.scrollTop > 50) {
        self.basicInfo.viewEntity.changeModelVariant('ArticleFocusModel')
      } else {
        self.basicInfo.viewEntity.changeModelVariant('default')
      }
    }
    // TODO REMOVE THIS SHOULD BE DONE BY THE ROUTER !!
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
