'use strict'

import { SkillsColumns, ColumnsCount, CategoriesCount, SkillsCount, SkillIndex } from './skills/SkillsColumns'

import Defaults from '../../config/defaults'
import POPUP_SKILLS_EXPLANATION from '../../config/POPUP_SKILLS_EXPLANATION'

const SkillsData = {
  basicInfo: {
    id: 'skillsBasicInfo',
    popups: (Defaults.disableDefaultPopups
      ? [] : [
        POPUP_SKILLS_EXPLANATION
      ])
  },
  skillIndex: SkillIndex,
  columns: SkillsColumns,
  limits: {
    columnsCount: ColumnsCount,
    categoriesCount: CategoriesCount,
    skillsCount: SkillsCount
  },
  filter: {}
}

export default SkillsData
