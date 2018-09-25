'use strict'

import { SkillsColumns, ColumnsCount, CategoriesCount, SkillsCount } from './skills/SkillsColumns'

import SKILLS_EXPLANATION from '../../config/SkillsExplanation'

const SkillsData = {
  basicInfo: {
    id: 'skillsBasicInfo',
    popups: [
      SKILLS_EXPLANATION
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
