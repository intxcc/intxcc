'use strict'

import { types } from 'mobx-state-tree'

const StoriesModel = types.model({
  scrollTop: types.optional(types.number, 0),
  years: types.array(types.number),
  selectedYear: types.optional(types.number, 0)
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
