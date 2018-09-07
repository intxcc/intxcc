'use strict'

import { types } from 'mobx-state-tree'

import EntityGuideModel from './EntityGuideModel'
import EntityPolygonModel from './EntityPolygonModel'

import { lineIntersect, degreesToRadians } from '../../miscFunctions'

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
    const stroke = config.stroke

    let points = []
    for (let pointConfig of config.points) {
      points.push(lineIntersect([
        self.guides.get(pointConfig[0]).from,
        self.guides.get(pointConfig[0]).to
      ], [
        self.guides.get(pointConfig[1]).from,
        self.guides.get(pointConfig[1]).to
      ]))
    }

    if (!self.polygons[index]) {
      self.polygons.set(index, EntityPolygonModel.create({
        fill: fill,
        stroke: stroke,
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
    const copy = config.copy
    const move = config.move
    const reverse = config.reverse
    const hide = config.hide

    let deg = config.deg
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

    if (type === 'copy' && copy) {
      deg = self.guides.get(copy).deg

      const position = self.guides.get(copy).pos
      pos = {
        x: position.x,
        y: position.y
      }
    }

    if (move) {
      let moveDir = 90

      if (reverse) {
        moveDir = -90
      }

      pos.x += Math.cos(degreesToRadians(deg + moveDir)) * move
      pos.y += Math.sin(degreesToRadians(deg + moveDir)) * move
    }

    if (!self.guides[index]) {
      self.guides.set(index, EntityGuideModel.create({
        hide: hide,
        deg: deg,
        pos: pos
      }))
    } else {
      self.guides[index].hide = hide
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
