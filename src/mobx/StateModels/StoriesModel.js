'use strict'

import { types } from 'mobx-state-tree'

import ViewEntity from './../model/ViewEntity'

const StoryModel = types.model({
  textName: types.string,
  summary: types.string
})

const StoriesModel = types.model({
  viewEntity: types.optional(types.reference(ViewEntity), ''),
  scrollTop: types.optional(types.number, 0),
  years: types.array(types.number),
  selectedYear: types.optional(types.number, 0),
  stories: types.array(StoryModel)
}).actions(self => {
  function setViewEntityReference (viewEntity) {
    self.viewEntity = viewEntity
  }

  function onScroll (scrollTop) {
    self.scrollTop = scrollTop

    if (self.viewEntity !== '') {
      if (self.scrollTop > 50) {
        self.viewEntity.changeModelVariant('ArticleFocusModel')
      } else {
        self.viewEntity.changeModelVariant('default')
      }
    }
  }

  function selectYear (index) {
    self.selectedYear = index
  }

  return {
    setViewEntityReference,
    onScroll,
    selectYear
  }
})

export default StoriesModel
