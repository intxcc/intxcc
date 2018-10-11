'use strict'

import { types } from 'mobx-state-tree'

const FilterOption = types.model({
  value: types.string
})

const SkillFilter = types.model({
  options: types.optional(types.map(FilterOption), {})
}).views(self => ({
  isChecked (optionName) {
    if (self.options.get(optionName)) {
      return true
    } else {
      return false
    }
  }
})).actions(self => {
  function toggleOption (optionName) {
    if (self.options.get(optionName)) {
      self.options.delete(optionName)
    } else {
      self.options.set(optionName, {
        value: 'checked'
      })
    }
  }

  return {
    toggleOption
  }
})

export default SkillFilter
