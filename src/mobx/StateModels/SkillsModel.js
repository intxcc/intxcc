'use strict'

import { types } from 'mobx-state-tree'

import { BasicInfoModel } from '../model/ViewEntity'

const SkillModel = types.model({
  id: types.number,
  title: types.string
})

const SkillCategory = types.model({
  id: types.number,
  title: types.string,
  skills: types.array(SkillModel)
})

const SkillColumn = types.model({
  id: types.number,
  title: types.string,
  categories: types.array(SkillCategory)
})

const Position = types.model({
  x: types.optional(types.number, 0),
  y: types.optional(types.number, 0)
})

const Selection = types.model({
  column: types.optional(types.number, 0),
  category: types.optional(types.number, 0),
  skill: types.optional(types.number, 0)
})

const SkillsModel = types.model({
  basicInfo: BasicInfoModel,
  mapPosition: types.optional(Position, {}),
  selection: types.optional(Selection, {}),
  columns: types.array(SkillColumn)
}).actions(self => {
  function moveMapBy (pos) {
    self.mapPosition = {
      x: self.mapPosition.x + pos.x,
      y: self.mapPosition.y + pos.y
    }
  }

  return {
    moveMapBy
  }
})

export default SkillsModel
