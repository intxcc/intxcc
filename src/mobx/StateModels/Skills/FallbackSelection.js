
'use strict'

import { types } from 'mobx-state-tree'

/** The purpose of this class, is to only show the selected columns/categories in fallback, to ensure the user can keep track of what is shown on the screen. */
const FallbackSelection = types.model({
  selectedColumns: types.optional(types.map(types.boolean), {}),
  selectedCategories: types.optional(types.map(types.boolean), {}),
  selectedSkills: types.optional(types.array(types.string), []),
  // That means the index of the single selected skill in the selection of skills of the fallback
  indexOfSelectedSkillInSelectedSkills: types.optional(types.number, -1)
}).views(self => ({
  isColumnSelected (columnIdentifier) {
    if (self.selectedColumns.get(columnIdentifier) && self.selectedColumns.get(columnIdentifier) === true) {
      return true
    } else {
      return false
    }
  },
  isCategorySelected (categoryIdentifier) {
    if (self.selectedCategories.get(categoryIdentifier) && self.selectedCategories.get(categoryIdentifier) === true) {
      return true
    } else {
      return false
    }
  }
})).volatile(self => ({
  // Remember columns of categories, to deselect them if the column is deselected
  rememberCategoryColumn: {}
})).actions(self => {
  function getNextOrPreviousSkillInSelection (n) {
    self.indexOfSelectedSkillInSelectedSkills += n

    if (self.indexOfSelectedSkillInSelectedSkills >= self.selectedSkills.length) {
      self.indexOfSelectedSkillInSelectedSkills = self.selectedSkills.length - 1
    } else if (self.indexOfSelectedSkillInSelectedSkills < 0) {
      self.indexOfSelectedSkillInSelectedSkills = 0
    }

    return self.selectedSkills[self.indexOfSelectedSkillInSelectedSkills]
  }

  function setSelectedSkills (skills, indexOfSelectedSkill) {
    self.indexOfSelectedSkillInSelectedSkills = indexOfSelectedSkill
    self.selectedSkills.clear()
    for (let skill of skills) {
      self.selectedSkills.push(skill.id)
    }
  }

  function showAll (columns) {
    for (let column of columns) {
      self.toggleOrSetSelectColumn(column.id, true)

      for (let category of column.categories) {
        self.toggleOrSetSelectCategory(category.id, column.id, true)
      }
    }
  }

  function showNone () {
    self.selectedColumns.clear()
    self.selectedCategories.clear()
    self.rememberCategoryColumn = {}
  }

  function toggleOrSetSelectColumn (columnIdentifier, setSelected = null) {
    const isColumnSelected = self.isColumnSelected(columnIdentifier)
    const newIsColumnSelected = (setSelected === null) ? !isColumnSelected : setSelected
    self.selectedColumns.set(columnIdentifier, newIsColumnSelected)

    if (!newIsColumnSelected && self.rememberCategoryColumn[columnIdentifier]) {
      for (let categoryIdentifier in self.rememberCategoryColumn[columnIdentifier]) {
        self.toggleOrSetSelectCategory(categoryIdentifier, columnIdentifier, false)
      }

      // Reset the remembered categories
      self.rememberCategoryColumn[columnIdentifier] = {}
    }
  }

  function toggleOrSetSelectCategory (categoryIdentifier, columnIdentifier, setSelected = null) {
    const isCategorySelected = self.isCategorySelected(categoryIdentifier)
    const newIsCategorySelected = (setSelected === null) ? !isCategorySelected : setSelected
    self.selectedCategories.set(categoryIdentifier, newIsCategorySelected)

    if (newIsCategorySelected) {
      if (!self.rememberCategoryColumn[columnIdentifier]) {
        self.rememberCategoryColumn[columnIdentifier] = {}
      }

      self.rememberCategoryColumn[columnIdentifier][categoryIdentifier] = 'selected'
    }
  }

  return {
    getNextOrPreviousSkillInSelection,
    setSelectedSkills,
    showAll,
    showNone,
    toggleOrSetSelectColumn,
    toggleOrSetSelectCategory
  }
})

export default FallbackSelection
