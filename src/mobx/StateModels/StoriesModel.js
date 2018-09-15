'use strict'

import { types } from 'mobx-state-tree'

const StoryModel = types.model({
  textName: types.string,
  summary: types.string
})

const StoriesModel = types.model({
  scrollTop: types.optional(types.number, 0),
  years: types.array(types.number),
  selectedYear: types.optional(types.number, 0),
  stories: types.array(StoryModel)
}).actions(self => {
  function onScroll (scrollTop) {
    self.scrollTop = scrollTop
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
