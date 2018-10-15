
'use strict'

import { types } from 'mobx-state-tree'

import SkillCategory from './SkillCategory'
import SkillColumn from './SkillColumn'

const FallbackSelection = types.model({
  selectedColumns: types.optional(types.array(types.reference(SkillColumn)), []),
  selectedCategories: types.optional(types.array(types.reference(SkillCategory)), [])
}).actions(self => {
  function toggleOrSetSelectColumn (setSelected = null) {

  }

  return {
    toggleOrSetSelectColumn
  }
})

export default FallbackSelection
