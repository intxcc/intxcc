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
      category.skills[skillIndex].columnId = 'column-' + columnCounter
      category.skills[skillIndex].categoryId = 'category-' + categoryCounter
      category.skills[skillIndex].id = 'skill-' + skillCounter
      skillCounter++
    }

    column.categories[categoryIndex].columnId = 'column-' + columnCounter
    column.categories[categoryIndex].id = 'category-' + categoryCounter
    categoryCounter++
  }

  SkillsColumns[columnIndex].id = 'column-' + columnCounter
  columnCounter++
}

const ColumnsCount = columnCounter
const CategoriesCount = categoryCounter
const SkillsCount = skillCounter

console.log(ColumnsCount)

export { SkillsColumns, ColumnsCount, CategoriesCount, SkillsCount }
