'use strict'

import { types, resolveIdentifier } from 'mobx-state-tree'

import { BasicInfoModel } from '../model/ViewEntity'

import { getIdNumberFromIdString } from '../../miscFunctions'

import SKILLS_EXPLANATION from '../../config/SkillsExplanation'
// TODO REMOVE THIS SHOULD BE DONE BY THE ROUTER !!
// import Style from '../../../style/variables/global.scss'

const SkillModel = types.model({
  id: types.identifier,
  categoryId: types.string,
  columnId: types.string,
  title: types.string,
  desc: types.optional(types.string, ''),
  trivia: types.optional(types.string, ''),
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
  transitionOn: types.optional(types.boolean, false)
}).actions(self => {
  function onRouterParamChange (paramName, paramValue) {
    switch (paramName) {
      case 'skill_id':
        self.selectSkillById(parseInt(paramValue))
        break
    }
  }

  function showExplanation () {
    self.basicInfo.showPopup(SKILLS_EXPLANATION)
  }

  function selectSkillByIdentifier (skillIdentifier) {
    // Show 404 if the skill does not exist and go to the skill with the id 0
    if (typeof resolveIdentifier(SkillModel, self.columns, skillIdentifier) === 'undefined') {
      self.selectSkillById(0)
      self.basicInfo.show404Popup()
      return
    }

    self.selection.skill = skillIdentifier
    self.selection.category = self.selection.skill.categoryId
    self.selection.column = self.selection.skill.columnId

    // TODO REMOVE THIS SHOULD BE DONE BY THE ROUTER !!
    // window.location.hash = '/skills/' + skillIdentifier + '-' + self.selection.skill.title.toLowerCase().replace(' ', '-')
  }

  // TODO REMOVE THIS SHOULD BE DONE BY THE ROUTER !!
  // function onSkillClick (skillIdentifier) {
  //   selectSkillByIdentifier(skillIdentifier)

  //   self.transitionOn = true
  //   setTimeout(self.turnTransitionOff, parseInt(Style.skillsMapTransitionTime) + 100)
  // }

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

    self.selectSkillById(skillId)
  }

  function selectSkillById (id) {
    const skillIdentifier = 'skill-' + id
    self.selectSkillByIdentifier(skillIdentifier)
  }

  return {
    onRouterParamChange,
    showExplanation,
    selectSkillByIdentifier,
    turnTransitionOff,
    toggleMouseDrag,
    onPointerLockChange,
    onMouseDown,
    onMouseUp,
    onMouseMove,
    scrollSkill,
    centerMap,
    moveMapBy,
    selectSkillById
  }
})

export default SkillsModel
