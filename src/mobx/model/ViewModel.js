'use strict'

import { types } from 'mobx-state-tree'

const Guide = types.model({
  deg: types.optional(types.number, 0)
})

const ViewModel = types.model({
  name: types.string,
  guides: types.map(Guide)
})

export default ViewModel
