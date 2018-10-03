'use strict'

import { types } from 'mobx-state-tree'

const PopupModel = types.model({
  id: types.identifier,
  className: types.optional(types.string, ''),
  persistent: types.optional(types.boolean, true),
  title: types.optional(types.string, ''),
  text: types.optional(types.string, ''),
  hint: types.optional(types.string, '')
})

export default PopupModel
