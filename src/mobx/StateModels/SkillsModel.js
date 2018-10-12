'use strict'

import { types, resolveIdentifier } from 'mobx-state-tree'

import BasicInfoModel from '../model/BasicInfoModel'
import SkillFilter from './Skills/SkillFilter'

import getColumns from '../StateModels/Skills/getColumns'
import { getIdNumberFromIdString } from '../../miscFunctions'

import Defaults from '../../config/defaults'
import SKILLS_EXPLANATION from '../../config/POPUP_SKILLS_EXPLANATION'

import Style from '../../../style/variables/global.scss'

const SkillModel = types.model({
  id: types.identifier,
  categoryId: types.string,
  columnId: types.string,
  visible: types.optional(types.boolean, true),
  title: types.string,
  desc: types.optional(types.string, ''),
  trivia: types.optional(types.string, ''),
  mark: types.optional(types.number, 0)
})

const SkillCategory = types.model({
  id: types.identifier,
  columnId: types.string,
  visible: types.optional(types.boolean, true),
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
  skill: types.maybeNull(types.reference(SkillModel)),
  // Will indicate, where the selected skill is in the skillIdentifierList
  skillIndex: types.optional(types.number, -1)
})

const SkillsModel = types.model({
  basicInfo: BasicInfoModel,
  routerParams: types.optional(types.map(types.string), {}),
  showSkillFilter: types.optional(types.boolean, Defaults.showSkillFilterPerDefault),
  mapPosition: types.optional(Position, {}),
  selection: types.optional(Selection, {}),
  skillTitleIndex: types.map(types.string),
  skillIdentifierList: types.array(types.string),
  skillIdentifierIndex: types.map(types.number),
  columns: types.array(SkillColumn),
  mouseLastPosition: types.optional(Position, {}),
  mouseDragActive: types.optional(types.boolean, false),
  mouseDragEnabled: types.optional(types.boolean, true),
  pointerLocked: types.optional(types.boolean, false),
  transitionOn: types.optional(types.boolean, false),
  filter: SkillFilter
}).actions(self => {
  function onRouterParamChange (paramName, paramValue) {
    self.routerParams.set(paramName, paramValue)

    switch (paramName) {
      case 'skill_id':
        // If the URL changes, we check if the skill id is different than the selected skill, and if this is the case we transition smoothly to the new skill. This does not happen if the scroll wheel changes the selected skill, as then the in the URL represented skill is already selected
        if (self.selection.skill !== null && getIdNumberFromIdString(self.selection.skill.id) === parseInt(paramValue)) {
          break
        }

        self.transitionOn = true
        setTimeout(self.turnTransitionOff, parseInt(Style.skillsMapTransitionTime) + 100)

        self.selectSkillById(parseInt(paramValue))
        break
      case 'skill_name':
        self.selectSkillByName(paramValue)
        break
    }
  }

  // TODO move this in a webworker, to not block teh main thread
  function applyFilter () {
    const {
      SkillsColumns,
      SkillTitleIndex,
      SkillIdentifierList,
      SkillIdentifierIndex
    } = getColumns(self.filter.toJSON())

    // To search for the next visible item later
    let oldIdentifierList = self.skillIdentifierList.toJSON()
    let oldIdentifierListSelection = self.selection.skillIndex

    self.columns = SkillsColumns
    self.skillTitleIndex = SkillTitleIndex
    self.skillIdentifierList = SkillIdentifierList
    self.skillIdentifierIndex = SkillIdentifierIndex

    for (let column of self.columns) {
      for (let category of column.categories) {
        let atLeastOneSkillVisible = false
        for (let skill of category.skills) {
          if (typeof self.skillIdentifierIndex.get(skill.id) !== 'undefined') {
            skill.visible = true
            atLeastOneSkillVisible = true
          } else {
            skill.visible = false
          }
        }

        category.visible = atLeastOneSkillVisible
      }
    }

    // Search the next visible item after the current selection
    if (self.skillIdentifierList.length > 0 && self.selection.skill && oldIdentifierListSelection >= 0) {
      let searchNewSelectionPos = oldIdentifierListSelection
      while (typeof self.skillIdentifierIndex.get(oldIdentifierList[searchNewSelectionPos]) === 'undefined') {
        searchNewSelectionPos++

        if (searchNewSelectionPos >= oldIdentifierList.length) {
          searchNewSelectionPos = 0
        }

        // Just to prevent infinite loops
        if (searchNewSelectionPos === oldIdentifierListSelection) {
          break
        }
      }

      self.selectSkillByIdentifier(oldIdentifierList[searchNewSelectionPos])
    }

    self.transitionOn = true
    setTimeout(self.turnTransitionOff, parseInt(Style.skillsMapTransitionTime) + 100)
  }

  function setShowSkillFilter (showSkillFilter) {
    if (showSkillFilter === 'toggle') {
      self.showSkillFilter = !self.showSkillFilter
    } else {
      self.showSkillFilter = showExplanation
    }
  }

  function showExplanation () {
    self.basicInfo.showPopup(SKILLS_EXPLANATION)
  }

  function selectSkillByName (skillName) {
    if (self.skillTitleIndex.get(skillName)) {
      const skillIdentifier = self.skillTitleIndex.get(skillName)
      self.selectSkillByIdentifier(skillIdentifier)
    } else {
      self.selectSkillById(0)
      self.basicInfo.show404Popup()
    }
  }

  function selectSkillByIdentifier (skillIdentifier) {
    // Show 404 if the skill does not exist and go to the skill with the id 0
    if (typeof skillIdentifier === 'undefined' || typeof resolveIdentifier(SkillModel, self.columns, skillIdentifier) === 'undefined') {
      self.selectSkillById(0)

      // If there are no skills the skill identifier will be undefined, don't show 404 in this case
      if (typeof skillIdentifier !== 'undefined') {
        self.basicInfo.show404Popup()
      }

      return
    }

    self.selection.skill = skillIdentifier
    self.selection.category = self.selection.skill.categoryId
    self.selection.column = self.selection.skill.columnId
    self.selection.skillIndex = self.skillIdentifierIndex.get(skillIdentifier)

    const selectionIdentifier = self.selection.skill.title.toLowerCase().replace(new RegExp(' ', 'g'), '-')

    // Check if the URL does represent the selected skill. If not, we change the URL
    if (parseInt(self.routerParams.get('skill_id')) !== getIdNumberFromIdString(self.selection.skill.id)) {
      if (self.routerParams.get('skill_name')) {
        window.history.replaceState(null, null, '/#/skills/' + skillIdentifier + '-' + selectionIdentifier)
      } else {
        window.history.pushState(null, null, '/#/skills/' + skillIdentifier + '-' + selectionIdentifier)
      }

      // Propagate hash change to router, which does normally not happened when the changes comes from within the application
      if (self.basicInfo) {
        setTimeout(self.basicInfo.rootStore.router.onHashChange, 0)
      }
    }
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
    self.selection.skillIndex += n

    if (self.selection.skillIndex >= self.skillIdentifierList.length) {
      self.selection.skillIndex = self.skillIdentifierList.length - 1
    } else if (self.selection.skillIndex < 0) {
      self.selection.skillIndex = 0
    }

    self.selectSkillByIdentifier(self.skillIdentifierList[self.selection.skillIndex])
  }

  function selectSkillById (id) {
    const skillIdentifier = 'skill-' + id
    self.selectSkillByIdentifier(skillIdentifier)
  }

  return {
    onRouterParamChange,
    applyFilter,
    setShowSkillFilter,
    showExplanation,
    selectSkillByName,
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
