'use strict'

import { types } from 'mobx-state-tree'

const PopupModel = types.model({
  className: types.optional(types.string, ''),
  title: types.optional(types.string, ''),
  text: types.optional(types.string, ''),
  hint: types.optional(types.string, '')
})

export default PopupModel
