'use strict'

import { types } from 'mobx-state-tree'

const Point = types.model({
  x: types.number,
  y: types.number
})

export default Point
