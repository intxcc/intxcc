'use strict'

import { types } from 'mobx-state-tree'

const FilterOption = types.model({
  value: types.string
})

const SkillFilter = types.model({
  options: types.optional(types.map(FilterOption), {})
}).views(self => ({
  isChecked (optionName) {
    if (self.options.get(optionName) && self.options.get(optionName).value === 'checked') {
      return true
    } else {
      return false
    }
  }
})).actions(self => {
  function toggleOption (optionName) {
    let newValue
    if (self.options.get(optionName) && self.options.get(optionName).value === 'checked') {
      newValue = ''
    } else {
      newValue = 'checked'
    }

    self.options.set(optionName, {
      value: newValue
    })
  }

  return {
    toggleOption
  }
})

export default SkillFilter
