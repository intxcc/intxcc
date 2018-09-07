'use strict'

import { types } from 'mobx-state-tree'

import EntityGuideModel from './EntityGuideModel'
import EntityPolygonModel from './EntityPolygonModel'

import { lineIntersect } from '../../miscFunctions'

/**
 * Describes the model of an View object. The model given describes the appearance of the polygons and guide lines.
 */
const ViewEntity = types.model({
  // Name of the ViewModel
  model: types.string,
  guides: types.optional(types.map(EntityGuideModel), {}),
  polygons: types.optional(types.map(EntityPolygonModel), {})
}).actions(self => {
  function setPolygon (config) {
    const index = config.name
    const fill = config.fill

    let points = []
    // for (let pointConfig of config.points) {
    //   let point = []
    //   point.push()
    // }

    if (!self.polygons[index]) {
      self.polygons.set(index, EntityPolygonModel.create({
        fill: fill,
        points: points
      }))
    } else {
      self.polygons[index].fill = fill
      self.polygons[index].points = points
    }
  }

  function setGuide (config) {
    const index = config.name
    const type = config.type
    const deg = config.deg

    let pos = config.pos
    let intersect = config.intersect

    if (type === 'intersection' && Array.isArray(intersect)) {
      pos = lineIntersect([
        self.guides.get(intersect[0]).from,
        self.guides.get(intersect[0]).to
      ], [
        self.guides.get(intersect[1]).from,
        self.guides.get(intersect[1]).to
      ])
    }

    if (!self.guides[index]) {
      self.guides.set(index, EntityGuideModel.create({
        deg: deg,
        pos: pos
      }))
    } else {
      self.guides[index].pos = pos
      self.guides[index].deg = deg
    }
  }

  return {
    setPolygon,
    setGuide
  }
})

export default ViewEntity
