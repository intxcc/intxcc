'use strict'

import { SkillsColumns, ColumnsCount, CategoriesCount, SkillsCount } from './skills/SkillsColumns'

const SkillsData = {
  basicInfo: {
    id: 'skillsBasicInfo'
  },
  columns: SkillsColumns,
  limits: {
    columnsCount: ColumnsCount,
    categoriesCount: CategoriesCount,
    skillsCount: SkillsCount
  }
}

export default SkillsData
