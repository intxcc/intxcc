'use strict'

import { types } from 'mobx-state-tree'

const StoriesModel = types.model({
  years: types.array(types.number),
  selectedYear: types.optional(types.number, 0)
}).actions(self => {
  function selectYear (index) {
    console.log(index)
    self.selectedYear = index
  }

  return {
    selectYear
  }
})

export default StoriesModel
