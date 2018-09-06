'use strict'

import { types } from 'mobx-state-tree'

import Point from './Point'

const Line = types.model({
  from: Point,
  to: Point
})

export default Line
