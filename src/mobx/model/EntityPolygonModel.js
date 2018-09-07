'use strict'

import { types } from 'mobx-state-tree'

import Point from './Point'

const EntityPolygonModel = types.model({
  fill: types.string,
  points: types.array(Point)
})

export default EntityPolygonModel
