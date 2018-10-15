'use strict'

import { types } from 'mobx-state-tree'

import SkillModel from './SkillModel'

const SkillCategory = types.model({
  id: types.identifier,
  columnId: types.string,
  visible: types.optional(types.boolean, true),
  title: types.string,
  skills: types.array(SkillModel)
})

export default SkillCategory
