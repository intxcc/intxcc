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

let columnCounter = 0
let categoryCounter = 0
let skillCounter = 0
for (let columnIndex in SkillsColumns) {
  const column = SkillsColumns[columnIndex]
  for (let categoryIndex in column.categories) {
    const category = column.categories[categoryIndex]
    for (let skillIndex in category.skills) {
      category.skills[skillIndex].id = skillCounter
      skillCounter++
    }

    column.categories[categoryIndex].id = categoryCounter
    categoryCounter++
  }

  SkillsColumns[columnIndex].id = columnCounter
  columnCounter++
}

export default SkillsColumns
