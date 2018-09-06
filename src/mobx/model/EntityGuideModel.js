'use strict'

import { types } from 'mobx-state-tree'

import Point from './Point'
import Line from './Line'

import { degreesToRadians, lineIntersect } from '../../miscFunctions'

const DefaultGuideLength = 2000

/**
 * The model for an actual guide line, that get drawn. The position and the angle gets copied from the GuideModel of the ViewModel. The from and to is calculated from these properties.
 */
const EntityGuideModel = types.model({
  // IMPORTANT: All properties, that are added here need to be also added in the constructor of the ViewEntity model and at the MARKER_1 in the View.js
  type: types.string,
  deg: types.number,
  pos: types.optional(Point, {
    x: 0,
    y: 0
  }),
  intersect: types.optional(types.array(Line), []),
  length: types.optional(types.number, DefaultGuideLength)
}).views(self => ({
  get position () {
    switch (self.type) {
      case 'div':
        return self.pos
      case 'intersection':
        return lineIntersect([
          self.intersect.get(0).from,
          self.intersect.get(0).to
        ], [
          self.intersect.get(1).from,
          self.intersect.get(1).to
        ])
    }
  },
  get from () {
    let position = self.position

    return {
      x: position.x - self.length * Math.cos(degreesToRadians(self.deg)),
      y: position.y - self.length * Math.sin(degreesToRadians(self.deg))
    }
  },
  get to () {
    let position = self.position

    return {
      x: position.x + self.length * Math.cos(degreesToRadians(self.deg)),
      y: position.y + self.length * Math.sin(degreesToRadians(self.deg))
    }
  }
}))

export default EntityGuideModel
