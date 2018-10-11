'use strict'

import Admin from './columns/Admin'
import Languages from './columns/Languages'
import Concepts from './columns/Concepts'
import Tools from './columns/Tools'
import General from './columns/General'

const SkillsColumns = [
  Languages,
  Admin,
  Concepts,
  Tools,
  General
]

// Index all skills for better searching and linking
// The skill index has the title of the skills with their ids
let SkillTitleIndex = {}

let columnCounter = 0
let categoryCounter = 0
let skillCounter = 0
for (let columnIndex in SkillsColumns) {
  const column = SkillsColumns[columnIndex]
  for (let categoryIndex in column.categories) {
    const category = column.categories[categoryIndex]
    for (let skillIndex in category.skills) {
      category.skills[skillIndex].columnId = 'column-' + columnCounter
      category.skills[skillIndex].categoryId = 'category-' + categoryCounter
      category.skills[skillIndex].id = 'skill-' + skillCounter

      const skillStringIdentifier = (category.skills[skillIndex].title).toLowerCase().replace(new RegExp(' ', 'g'), '-')
      SkillTitleIndex[skillStringIdentifier] = 'skill-' + skillCounter

      skillCounter++
    }

    column.categories[categoryIndex].columnId = 'column-' + columnCounter
    column.categories[categoryIndex].id = 'category-' + categoryCounter

    categoryCounter++
  }

  SkillsColumns[columnIndex].id = 'column-' + columnCounter

  columnCounter++
}

function filterSkill (skill, filter) {
  let markPassed = false

  const mark = {
    1: filter.options['mark-1'],
    2: filter.options['mark-2'],
    3: filter.options['mark-3']
  }

  let markFilterEnabled = false
  for (let testMark in mark) {
    const markActive = mark[testMark]
    if (markActive) {
      markFilterEnabled = true
      if (parseInt(testMark) === skill.mark) {
        markPassed = true
      }
    }
  }

  if (!markFilterEnabled) {
    // Disable marked filter if no mark is selected
    markPassed = true
  }

  // Other filters to be added here
  return (markPassed)
}

function getColumns (filter) {
  // The skill list has all skill identifiers
  let SkillIdentifierList = []

  // This will show the position of a skill in the SkillIdentifierList
  let SkillIdentifierIndex = {}

  let skillIdentifierListIndex = 0
  for (let column of SkillsColumns) {
    for (let category of column.categories) {
      for (let skill of category.skills) {
        if (!filter || filterSkill(skill, filter)) {
          SkillIdentifierIndex[skill.id] = skillIdentifierListIndex
          SkillIdentifierList.push(skill.id)

          skillIdentifierListIndex++
        }
      }
    }
  }

  return {
    SkillsColumns,
    SkillTitleIndex,
    SkillIdentifierList,
    SkillIdentifierIndex
  }
}

export default getColumns
