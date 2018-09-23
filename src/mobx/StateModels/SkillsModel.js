'use strict'

import { types } from 'mobx-state-tree'

import { BasicInfoModel } from '../model/ViewEntity'

const SkillModel = types.model({
  title: types.string
})

const SkillCategory = types.model({
  title: types.string,
  skills: types.array(SkillModel)
})

const SkillColumn = types.model({
  title: types.string,
  categories: types.array(SkillCategory)
})

const SkillsModel = types.model({
  basicInfo: BasicInfoModel,
  columns: types.array(SkillColumn)
})

export default SkillsModel
