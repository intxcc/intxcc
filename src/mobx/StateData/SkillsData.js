'use strict'

import getColumns from '../StateModels/Skills/getColumns'

import Defaults from '../../config/defaults'
import POPUP_SKILLS_EXPLANATION from '../../config/POPUP_SKILLS_EXPLANATION'

const { SkillsColumns, SkillTitleIndex, SkillIdentifierList, SkillIdentifierIndex } = getColumns()

const SkillsData = {
  basicInfo: {
    id: 'skillsBasicInfo',
    popups: (Defaults.disableDefaultPopups
      ? [] : [
        POPUP_SKILLS_EXPLANATION
      ])
  },
  skillTitleIndex: SkillTitleIndex,
  skillIdentifierList: SkillIdentifierList,
  skillIdentifierIndex: SkillIdentifierIndex,
  columns: SkillsColumns,
  filter: {}
}

export default SkillsData
