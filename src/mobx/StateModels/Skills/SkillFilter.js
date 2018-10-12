'use strict'

import { types, getParent } from 'mobx-state-tree'

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
  function applyFilter () {
    const parent = getParent(self)
    if (parent.applyFilter) {
      parent.applyFilter()
    }
  }

  function setOption (optionName, value) {
    self.options.set(optionName, {
      value: value
    })

    self.applyFilter()
  }

  function toggleOption (optionName) {
    if (self.options.get(optionName)) {
      self.options.delete(optionName)
    } else {
      self.options.set(optionName, {
        value: 'checked'
      })
    }

    self.applyFilter()
  }

  return {
    applyFilter,
    setOption,
    toggleOption
  }
})

export default SkillFilter
