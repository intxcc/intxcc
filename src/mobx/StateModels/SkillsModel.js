'use strict'

import { types, resolveIdentifier } from 'mobx-state-tree'

import BasicInfoModel from '../model/BasicInfoModel'
import SkillFilter from './Skills/SkillFilter'

import getColumns from '../StateModels/Skills/getColumns'
import { getIdNumberFromIdString } from '../../miscFunctions'

import Defaults from '../../config/defaults'
import SKILLS_EXPLANATION from '../../config/POPUP_SKILLS_EXPLANATION'

import Style from '../../../style/variables/global.scss'

import SkillModel from './Skills/SkillModel'
import SkillCategory from './Skills/SkillCategory'
import SkillColumn from './Skills/SkillColumn'

import FallbackSelection from './Skills/FallbackSelection'

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
  fallbackUseSkillMap: types.optional(types.boolean, false),
  fallbackShowSkillDetailsInner: types.optional(types.boolean, false),
  fallbackShowSkillDetails: types.optional(types.boolean, false),
  routerParams: types.optional(types.map(types.string), {}),
  showSkillFilter: types.optional(types.boolean, Defaults.showSkillFilterPerDefault),
  mapPosition: types.optional(Position, {}),
  selection: types.optional(Selection, {}),
  fallbackSelection: types.optional(FallbackSelection, {}),
  // skillTitleIndex contains always ALL skills, mapping the title to an identifier string. That variable does ignore the filter.
  skillTitleIndex: types.map(types.string),
  // The next 2 variables contain all skills visible for the filter currently active
  skillIdentifierList: types.array(types.string),
  skillIdentifierIndex: types.map(types.number),
  columns: types.array(SkillColumn),
  mouseLastPosition: types.optional(Position, {}),
  mouseDragActive: types.optional(types.boolean, false),
  mouseDragEnabled: types.optional(types.boolean, true),
  pointerLocked: types.optional(types.boolean, false),
  transitionOn: types.optional(types.boolean, false),
  ignoreNextEmptySkillName: types.optional(types.boolean, false),
  filter: SkillFilter
}).actions(self => {
  function setFallbackUseSkillMap (fallbackUseSkillMap) {
    self.fallbackUseSkillMap = fallbackUseSkillMap
  }

  // Handle all keydown events, while this is the active state
  function handleOnKeyDown (e) {
    if (!e.key) {
      return
    }

    switch (e.key) {
      case 'Escape':
        self.fallbackShowSkillDetails = false
        break
      case 'Left':
      case 'ArrowLeft':
        self.scrollSkill(-1)
        break
      case 'Right':
      case 'ArrowRight':
        self.scrollSkill(1)
        break
    }
  }

  function onRouterParamChange (paramName, paramValue) {
    self.routerParams.set(paramName, paramValue)

    // If the params where deleted, also delete the selection
    if ((paramName === 'skill_id' || paramName === 'skill_name') && paramValue === '') {
      if (paramName === 'skill_name' && self.ignoreNextEmptySkillName) {
        self.ignoreNextEmptySkillName = false
        return
      }

      self.unSelect()
      return
    }

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

  // TODO move this in a webworker, to not block the main thread
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

    // Only show a column, if at least one skill is visible
    for (let column of self.columns) {
      for (let category of column.categories) {
        let atLeastOneSkillVisible = false
        for (let skill of category.skills) {
          // Check if skill is in skillIdentifierIndex, which holds all visible skill identifiers
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
    if (oldIdentifierList.length > 0 && self.skillIdentifierList.length > 0 && self.selection.skill && oldIdentifierListSelection >= 0) {
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

    // If no skill is selected, choose the first visible
    if (!self.selection.skill) {
      if (self.skillIdentifierList.length > 0) {
        self.selectSkillByIdentifier(self.skillIdentifierList.get(0))
      }
    } else if (self.selection.skill.id && typeof self.skillIdentifierIndex.get(self.selection.skill.id) === 'undefined') {
      // If one is selected, but not visible, remove selection
      self.unSelect()
    }

    // Disable transition, because it results in transitioning bugs
    // self.transitionOn = true
    // setTimeout(self.turnTransitionOff, parseInt(Style.skillsMapTransitionTime) + 100)
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
    // This function will result in changing the URL from name to id, so the skill name will be set empty, ignore it, if this function was the cause
    self.ignoreNextEmptySkillName = true

    if (self.skillTitleIndex.get(skillName)) {
      const skillIdentifier = self.skillTitleIndex.get(skillName)
      self.selectSkillByIdentifier(skillIdentifier)
    } else {
      self.selectSkillById(0)
      self.basicInfo.show404Popup()
    }
  }

  function unSelect () {
    self.selection.skill = null
    self.selection.category = null
    self.selection.column = null
    self.selection.skillIndex = -1
  }

  function fallbackSetShowSkillDetailsInner (show) {
    self.fallbackShowSkillDetailsInner = show
  }

  function fallbackSetShowSkillDetails (show) {
    setTimeout(() => self.fallbackSetShowSkillDetailsInner(show), 0)
    self.fallbackShowSkillDetails = show
  }

  function getArrayOfSkills () {
    let array = []
    for (let column of self.columns.toJSON()) {
      for (let category of column.categories) {
        for (let skill of category.skills) {
          array.push(skill)
        }
      }
    }

    return array
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

    // If no skill was selected before and the fallback selection is empty, select all skills. This might be usefull if a user will receive a link to a skill and does not know, that more skills are there. Avoid, that the skill page shows 0 of 0 skills for UX reasons.
    if (!self.selection.skill && self.fallbackSelection.selectedSkills.length < 1) {
      self.fallbackSelection.showAll(self.columns)
    }

    self.selection.skill = skillIdentifier
    self.selection.category = self.selection.skill.categoryId
    self.selection.column = self.selection.skill.columnId
    self.selection.skillIndex = self.skillIdentifierIndex.get(skillIdentifier)

    // If the skills map is active in fallback, set the setIndexOfSelectedSkillinSkillList to the skillIndex of the selected skill
    if (self.fallbackUseSkillMap && self.basicInfo.rootStore.global.useFallback) {
      self.fallbackSelection.setIndexOfSelectedSkillinSkillList(self.selection.skillIndex)

      // If the skill map is active in fallback and not all skills are selected already, select all skills
      if (self.fallbackSelection.selectedSkills.length !== self.skillIdentifierList.length) {
        self.fallbackSelection.showAll(self.columns)
        self.fallbackSelection.setSelectedSkills(self.getArrayOfSkills())
      }
    }

    const selectionIdentifier = self.selection.skill.title.toLowerCase().replace(new RegExp(' ', 'g'), '-')

    // If a skill is selected, show the skill details in fallback mode
    self.fallbackSetShowSkillDetails(true)

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
    // Only when just one touch is registered, we will handle it like the mouse
    let screenX = e.screenX
    let screenY = e.screenY
    if (e.touches) {
      if (e.touches.length === 1) {
        screenX = e.touches[0].screenX
        screenY = e.touches[0].screenY
      } else {
        self.mouseDragActive = false
        return
      }
    }

    self.mouseDragActive = true
    self.mouseLastPosition = {
      x: screenX,
      y: screenY
    }
  }

  function onMouseUp (e) {
    self.mouseDragActive = false
  }

  function onMouseMove (e) {
    // Only when just one touch is registered, we will handle it like the mouse
    let screenX = e.screenX
    let screenY = e.screenY
    if (e.touches && e.touches.length === 1) {
      screenX = e.touches[0].screenX
      screenY = e.touches[0].screenY
    }

    if (self.mouseDragEnabled && self.mouseDragActive) {
      const delta = {
        x: -(self.mouseLastPosition.x - screenX),
        y: -(self.mouseLastPosition.y - screenY)
      }

      self.mouseLastPosition = {
        x: screenX,
        y: screenY
      }

      self.moveMapBy(delta)
    }
  }

  function centerMap (x, y) {
    // If we are in fallback mode we need to get the width and height manually. Also move the selection a bit to the right, as fallback indicates mostly a smaller screen.
    if (self.basicInfo.rootStore.global.useFallback) {
      self.basicInfo.clientWidth = window.innerWidth
      self.basicInfo.clientHeight = window.innerHeight

      x -= window.innerWidth / 5
    }

    self.mapPosition.x = self.mapPosition.x - x + self.basicInfo.clientWidth / 2
    self.mapPosition.y = self.mapPosition.y - y + self.basicInfo.clientHeight / 2
  }

  function moveMapBy (pos) {
    self.mapPosition = {
      x: self.mapPosition.x + pos.x,
      y: self.mapPosition.y + pos.y
    }
  }

  function scrollSkill (n, e = null) {
    // If [STRG] is pressed while scrolling, the user probably wants to zoom and not to change the selection.
    if (e && e.ctrlKey) {
      return
    }

    // If fallback is active we need to respect the fallback selection
    if (self.basicInfo.rootStore.global.useFallback) {
      self.selectSkillByIdentifier(self.fallbackSelection.getNextOrPreviousSkillInSelection(n))
      return
    }

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
    setFallbackUseSkillMap,
    handleOnKeyDown,
    onRouterParamChange,
    applyFilter,
    setShowSkillFilter,
    showExplanation,
    selectSkillByName,
    unSelect,
    fallbackSetShowSkillDetailsInner,
    fallbackSetShowSkillDetails,
    getArrayOfSkills,
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
