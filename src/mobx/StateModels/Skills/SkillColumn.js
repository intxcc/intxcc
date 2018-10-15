
'use strict'

import { types } from 'mobx-state-tree'

import SkillCategory from './SkillCategory'

const SkillColumn = types.model({
  id: types.identifier,
  title: types.string,
  categories: types.array(SkillCategory)
})

export default SkillColumn
