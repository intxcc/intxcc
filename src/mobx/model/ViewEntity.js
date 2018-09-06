'use strict'

import { types } from 'mobx-state-tree'

import EntityGuideModel from './EntityGuideModel'

/**
 * Describes the model of an View object. The model given describes the appearance of the polygons and guide lines.
 */
const ViewEntity = types.model({
  // Name of the ViewModel
  model: types.string,
  guides: types.optional(types.map(EntityGuideModel), {})
}).actions(self => {
  function setGuide (config) {
    const index = config.name
    const type = config.type
    const deg = config.deg
    const pos = config.pos
    const intersect = config.intersect

    if (!self.guides[index]) {
      self.guides.set(index, EntityGuideModel.create({
        type: type,
        deg: deg,
        pos: pos,
        intersect: intersect
      }))
    } else {
      self.guides[index].pos = pos
      self.guides[index].deg = deg
    }
  }

  return {
    setGuide
  }
})

export default ViewEntity
