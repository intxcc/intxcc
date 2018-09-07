'use strict'

import { types } from 'mobx-state-tree'

import Point from './Point'

const EntityPolygonModel = types.model({
  fill: types.string,
  stroke: types.string,
  points: types.array(Point)
}).views(self => ({
  get path () {
    let path = 'M '
    for (let point of self.points) {
      path += point.x + ',' + point.y + ' '
    }
    path += ' Z'

    return path
  }
}))

export default EntityPolygonModel
