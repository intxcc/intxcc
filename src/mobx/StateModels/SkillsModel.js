'use strict'

import { types } from 'mobx-state-tree'

import { BasicInfoModel } from '../model/ViewEntity'

import Style from '../../../style/variables/global.scss'

const SkillModel = types.model({
  id: types.identifier,
  categoryId: types.string,
  columnId: types.string,
  title: types.string,
  mark: types.optional(types.number, 0)
})

const SkillCategory = types.model({
  id: types.identifier,
  columnId: types.string,
  title: types.string,
  skills: types.array(SkillModel)
})

const SkillColumn = types.model({
  id: types.identifier,
  title: types.string,
  categories: types.array(SkillCategory)
})

const Position = types.model({
  x: types.optional(types.number, 0),
  y: types.optional(types.number, 0)
})

const Selection = types.model({
  column: types.maybeNull(types.reference(SkillColumn)),
  category: types.maybeNull(types.reference(SkillCategory)),
  skill: types.maybeNull(types.reference(SkillModel))
})

const Limits = types.model({
  columnsCount: types.optional(types.number, 0),
  categoriesCount: types.optional(types.number, 0),
  skillsCount: types.optional(types.number, 0)
})

const SkillsModel = types.model({
  basicInfo: BasicInfoModel,
  mapPosition: types.optional(Position, {}),
  selection: types.optional(Selection, {}),
  columns: types.array(SkillColumn),
  limits: types.optional(Limits, {}),
  mouseLastPosition: types.optional(Position, {}),
  mouseDragActive: types.optional(types.boolean, false),
  mouseDragEnabled: types.optional(types.boolean, true),
  pointerLocked: types.optional(types.boolean, false),
  transitionOn: types.optional(types.boolean, false),
}).actions(self => {
  function selectSkillByIdentifier (skillIdentifier) {
    self.selection.skill = skillIdentifier
    self.selection.category = self.selection.skill.categoryId
    self.selection.column = self.selection.skill.columnId
  }

  function onSkillClick (skillIdentifier) {
    selectSkillByIdentifier(skillIdentifier)

    self.transitionOn = true
    setTimeout(self.turnTransitionOff, parseInt(Style.skillsMapTransitionTime) + 100)
  }

  function turnTransitionOff () {
    self.transitionOn = false
  }

  function toggleMouseDrag () {
    self.mouseDragEnabled = !self.mouseDragEnabled
  }

  function onPointerLockChange (isLocked) {
    self.pointerLocked = isLocked
  }

  function onMouseDown (e) {
    self.mouseDragActive = true
    self.mouseLastPosition = {
      x: e.screenX,
      y: e.screenY
    }
  }

  function onMouseUp (e) {
    self.mouseDragActive = false
  }

  function onMouseMove (e) {
    if (self.mouseDragEnabled && self.mouseDragActive) {
      const delta = {
        x: -(self.mouseLastPosition.x - e.screenX),
        y: -(self.mouseLastPosition.y - e.screenY)
      }

      self.mouseLastPosition = {
        x: e.screenX,
        y: e.screenY
      }

      self.moveMapBy(delta)
    }
  }

  function getIdNumberFromIdString (idString) {
    return parseInt(idString.split('-')[1])
  }

  function centerMap (x, y) {
    self.mapPosition.x = self.mapPosition.x - x + self.basicInfo.clientWidth / 2
    self.mapPosition.y = self.mapPosition.y - y + self.basicInfo.clientHeight / 2
  }

  function moveMapBy (pos) {
    self.mapPosition = {
      x: self.mapPosition.x + pos.x,
      y: self.mapPosition.y + pos.y
    }
  }

  function scrollSkill (n) {
    let skillId
    if (self.selection.skill) {
      skillId = getIdNumberFromIdString(self.selection.skill.id)
      skillId += n

      if (skillId >= self.limits.skillsCount) {
        skillId = self.limits.skillsCount - 1
      }

      if (skillId < 0) {
        skillId = 0
      }
    } else {
      skillId = 0
    }

    self.selectSkill(skillId)
  }

  function selectSkill (id) {
    const skillIdentifier = 'skill-' + id
    self.selectSkillByIdentifier(skillIdentifier)
  }

  return {
    selectSkillByIdentifier,
    onSkillClick,
    turnTransitionOff,
    toggleMouseDrag,
    onPointerLockChange,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    scrollSkill,
    centerMap,
    moveMapBy,
    selectSkill
  }
})

export default SkillsModel
