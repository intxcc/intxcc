'use strict'

import { types } from 'mobx-state-tree'
import { values } from 'mobx'

import BasicInfoModel from './BasicInfoModel'
import EntityGuideModel from './EntityGuideModel'
import EntityPolygonModel from './EntityPolygonModel'
import EntityObjectModel from './EntityObjectModel'

import { lineIntersect, degreesToRadians } from '../../miscFunctions'

import Style from '../../../style/variables/global.scss'

/**
 * Describes the model of an View object. The model given describes the appearance of the polygons and guide lines.
 */
const ViewEntity = types.model({
  // Necessary to reference this in the basicStateInfo
  id: types.identifier,
  // Name of the ViewModel
  model: types.optional(types.string, ''),
  modelVariant: types.optional(types.string, 'default'),
  // Cooldown to prevent some race conditions, that were the cause of a freezed main view bug
  cooldown: types.optional(types.boolean, true),
  stateBasicInfo: types.maybeNull(types.reference(types.late(() => BasicInfoModel))),
  nextModelVariant: types.optional(types.string, ''),
  snapshotVariant: types.optional(types.string, ''),
  transitionState: types.optional(types.string, ''),
  guides: types.optional(types.map(EntityGuideModel), {}),
  guidesSnapshot: types.optional(types.map(EntityGuideModel), {}),
  polygons: types.optional(types.map(EntityPolygonModel), {}),
  polygonsSnapshot: types.optional(types.map(EntityPolygonModel), {}),
  objects: types.optional(types.map(EntityObjectModel), {})
}).views(self => ({
  get isDisabled () {
    if (!self.stateBasicInfo) {
      return true
    } else {
      return self.stateBasicInfo.isDisabled
    }
  }
})).actions(self => {
  // Save the reference to the basic info of the view state that is currently using this viewentity to display its state
  function setStateBasicInfo (stateBasicInfo) {
    self.stateBasicInfo = stateBasicInfo
  }

  function stopCooldown () {
    self.cooldown = false
  }

  // ATTENTION Only use extremely careful. Probably only once, in the initialization
  function forceModelVariant (modelvariant) {
    self.modelVariant = modelvariant
  }

  // Save current guides state to morph from this to a new one
  function snapshotEntity () {
    self.snapshotVariant = self.modelVariant
    self.guidesSnapshot = JSON.parse(JSON.stringify(self.guides))
    self.polygonsSnapshot = JSON.parse(JSON.stringify(self.polygons))
  }

  function changeModelVariant (modelVariant) {
    // Dont allow changing if the current variant is the same as the one that should be changed to
    if (self.modelVariant === modelVariant) {
      // If the state is still transitioning, its possible, that to go back we still need a transition
      if (self.transitionState === 'morphVariant' && self.nextModelVariant !== '') {
        self.nextModelVariant = modelVariant
      }

      return
    }

    // If we just can't morph, because there is a transition happening, we wait a few milliseconds and try again
    if (self.transitionState === 'morphVariant' && modelVariant !== 'next' && self.modelVariant !== modelVariant) {
      // We set only one timeout, to check back in a few ms, if the requested change is still wanted
      if (self.nextModelVariant === '') {
        setTimeout(() => self.changeModelVariant('next'), 100)
      }

      // While the timeout is waiting, if something still wants to change the model, it gets saved, so later that last requested change will happen
      self.nextModelVariant = modelVariant
    }

    // We waited.. But not long enough. Wait again.
    if (self.transitionState === 'morphVariant' && modelVariant === 'next') {
      setTimeout(() => self.changeModelVariant('next'), 100)
    }

    // If we are transitioning nothing goes past this point
    if (self.transitionState === 'morphVariant') {
      return
    }

    // This is the function call of the timeout, because we were busy
    if (modelVariant === 'next') {
      // Get the last requested model change
      modelVariant = self.nextModelVariant

      // Check again, if it is different, than the current
      if (self.modelVariant === modelVariant || modelVariant === '') {
        return
      }
    }

    // Reset the "waiting queue"
    self.nextModelVariant = ''

    self.snapshotEntity()
    self.modelVariant = modelVariant
    self.stateBasicInfo.setModelVariant(modelVariant)
    self.transitionState = 'morphVariant'

    // The multiplication with 2, because flubber needs some freetime to create the right paths
    setTimeout(self.resetTransitionState, parseInt(Style.morphDuration) * 2)
  }

  function resetTransitionState () {
    self.transitionState = ''
    self.snapshotEntity()
  }

  function fadeIn () {
    self.transitionState = 'fadeIn'
  }

  function startTransition () {
    self.transitionState = 'fadeOut'
    setTimeout(self.startMorphing, Style.fadeOutDuration)
  }

  function startMorphing () {
    self.transitionState = 'morphing'
    setTimeout(self.endMorphing, parseInt(Style.morphDuration) + 100)
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
    const deg = config.deg
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
        deg: deg,
        pos: pos
      }))
    } else {
      self.objects[index].className = index
      self.objects[index].deg = deg
      self.objects[index].pos = pos
    }
  }

  function setPolygon (config) {
    const index = config.name
    const fill = config.fill
    const stroke = config.stroke
    const strokeWidth = config.strokeWidth
    const morphTo = values(config.morphTo)

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
        morphTo: morphTo,
        fill: fill,
        stroke: stroke,
        strokeWidth: strokeWidth,
        points: points
      }))
    } else {
      self.polygons[index].morphTo = morphTo
      self.polygons[index].fill = fill
      self.polygons[index].stroke = stroke
      self.polygons[index].strokeWidth = strokeWidth
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
      // -1111 is a magic number, to signal undefined deg
      if (deg === -1111) {
        deg = self.guides.get(copy).deg
      }

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
    setStateBasicInfo,
    stopCooldown,
    forceModelVariant,
    snapshotEntity,
    changeModelVariant,
    resetTransitionState,
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
