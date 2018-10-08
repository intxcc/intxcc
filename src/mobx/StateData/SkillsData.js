'use strict'

import { SkillsColumns, ColumnsCount, CategoriesCount, SkillsCount } from './skills/SkillsColumns'

import POPUP_SKILLS_EXPLANATION from '../../config/POPUP_SKILLS_EXPLANATION'

const SkillsData = {
  basicInfo: {
    id: 'skillsBasicInfo',
    popups: [
      POPUP_SKILLS_EXPLANATION
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
