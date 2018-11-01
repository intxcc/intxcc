'use strict'

import { types } from 'mobx-state-tree'

const SkillModel = types.model({
  id: types.identifier,
  categoryId: types.string,
  columnId: types.string,
  visible: types.optional(types.boolean, true),
  title: types.string,
  desc: types.optional(types.string, ''),
  wikiLink: types.optional(types.string, ''),
  trivia: types.optional(types.string, ''),
  mark: types.optional(types.number, 0)
})

export default SkillModel
