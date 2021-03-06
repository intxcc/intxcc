'use strict'

import Admin from './columns/Admin'
import Languages from './columns/Languages'
import Concepts from './columns/Concepts'
import Tools from './columns/Tools'
import General from './columns/General'

import { getNameIdentifierFromSkill } from '../../../miscFunctions'

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

      const skillStringIdentifier = getNameIdentifierFromSkill(category.skills[skillIndex])
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

export { SkillsColumns, SkillTitleIndex }
