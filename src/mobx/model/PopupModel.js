'use strict'

import { types } from 'mobx-state-tree'

const PopupModel = types.model({
  id: types.identifier,
  className: types.optional(types.string, ''),
  persistent: types.optional(types.boolean, true),
  customComponent: types.optional(types.string, ''),
  title: types.optional(types.string, ''),
  text: types.optional(types.string, ''),
  hint: types.optional(types.string, ''),
  fallbackHint: types.optional(types.string, ''),
  trivia: types.optional(types.string, '')
})

export default PopupModel
