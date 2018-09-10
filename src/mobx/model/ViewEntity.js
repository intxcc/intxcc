'use strict'

import { types } from 'mobx-state-tree'

import EntityGuideModel from './EntityGuideModel'
import EntityPolygonModel from './EntityPolygonModel'
import EntityObjectModel from './EntityObjectModel'

import { lineIntersect, degreesToRadians } from '../../miscFunctions'

import Style from '../../../style/variables/global.scss'

/**
 * Describes the model of an View object. The model given describes the appearance of the polygons and guide lines.
 */
const ViewEntity = types.model({
  // Name of the ViewModel
  model: types.string,
  transitionState: types.optional(types.string, ''),
  guides: types.optional(types.map(EntityGuideModel), {}),
  polygons: types.optional(types.map(EntityPolygonModel), {}),
  objects: types.optional(types.map(EntityObjectModel), {})
}).actions(self => {
  function fadeIn () {
    self.transitionState = 'fadeIn'
  }

  function startTransition () {
    self.transitionState = 'fadeOut'
    setTimeout(self.startMorphing, Style.fadeOutDuration)
  }

  function startMorphing () {
    self.transitionState = 'morphing'
    setTimeout(self.endMorphing, parseInt(Style.fadeOutDuration) + 100)
  }

  function endMorphing () {
    self.transitionState = 'fadeInBuffer'
    setTimeout(self.swapBuffer, Style.fadeOutDuration)
  }

  function swapBuffer () {
    self.transitionState = 'swapBuffer'
  }

  // Set an object of the entity. The main data is given from the view model and here the calculations take place, to position the object. An object can be anything (e.g. a div), it just needs an class name.
  function setObject (config) {
    const index = config.name
    const type = config.type
    const intersections = config.intersections

    let pos
    if (type === 'intersections') {
      let pointCount = 0
      let pointMiddle = {
        x: 0,
        y: 0
      }

      for (let intersection of intersections) {
        let point = lineIntersect([
          self.guides.get(intersection[0]).from,
          self.guides.get(intersection[0]).to
        ], [
          self.guides.get(intersection[1]).from,
          self.guides.get(intersection[1]).to
        ])

        pointMiddle.x += point.x
        pointMiddle.y += point.y

        pointCount++
      }

      pos = {
        x: pointMiddle.x / pointCount,
        y: pointMiddle.y / pointCount
      }
    }

    if (!self.objects[index]) {
      self.objects.set(index, EntityObjectModel.create({
        className: index,
        pos: pos
      }))
    } else {
      self.objects[index].className = index
      self.objects[index].pos = pos
    }
  }

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
    fadeIn,
    startTransition,
    startMorphing,
    endMorphing,
    swapBuffer,
    setObject,
    setPolygon,
    setGuide
  }
})

export default ViewEntity
