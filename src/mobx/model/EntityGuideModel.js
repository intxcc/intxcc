'use strict'

import { types } from 'mobx-state-tree'

import Defaults from '../../config/defaults'

import Point from './Point'

import { degreesToRadians } from '../../miscFunctions'

/**
 * The model for an actual guide line, that get drawn. The position and the angle gets copied from the GuideModel of the ViewModel. The from and to is calculated from these properties.
 */
const EntityGuideModel = types.model({
  // IMPORTANT: All properties, that are added here need to be also added in the constructor of the ViewEntity model, the GuideModel at ViewModel.js and at the MARKER_1 in the View.js
  hide: types.boolean,
  pos: Point,
  deg: types.number,
  length: types.optional(types.number, Defaults.GuideLength)
}).views(self => ({
  get from () {
    return {
      x: self.pos.x - self.length * Math.cos(degreesToRadians(self.deg)),
      y: self.pos.y - self.length * Math.sin(degreesToRadians(self.deg))
    }
  },
  get to () {
    return {
      x: self.pos.x + self.length * Math.cos(degreesToRadians(self.deg)),
      y: self.pos.y + self.length * Math.sin(degreesToRadians(self.deg))
    }
  }
}))

export default EntityGuideModel
