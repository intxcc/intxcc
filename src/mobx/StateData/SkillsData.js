'use strict'

import { SkillsColumns, ColumnsCount, CategoriesCount, SkillsCount } from './skills/SkillsColumns'

const SkillsData = {
  basicInfo: {
    id: 'skillsBasicInfo',
    popups: [
      {
        title: 'Explanation of skills',
        text: 'The skills are rated from 1 to 3, where 1 is basic, 2 is good and 3 is very good knowledge.',
        hint: 'The rating is shown on the left side of each skill.'
      }
    ]
  },
  columns: SkillsColumns,
  limits: {
    columnsCount: ColumnsCount,
    categoriesCount: CategoriesCount,
    skillsCount: SkillsCount
  }
}

export default SkillsData
