
'use strict'

import { types } from 'mobx-state-tree'

import SkillsModel from '../SkillsModel'

import SkillModel from './SkillModel'

const StoriesFilter = types.model({
  expand: types.optional(types.boolean, false),
  selectedSkills: types.optional(types.array(types.reference(SkillModel)), []),
  skillsModel: types.optional(types.reference(types.late(() => SkillsModel)), 'skillsState'),
  addSkillMode: types.optional(types.boolean, false)
}).actions(self => {
  function toggleAddSkillMode () {
    self.setAddSkillMode(!self.addSkillMode)
  }

  function setAddSkillMode (addSkillMode) {
    if (addSkillMode) {
      self.skillsModel.unSelect()
    }

    self.addSkillMode = addSkillMode
  }

  function toggleExpand () {
    self.setExpand(!self.expand)
  }

  function clearSelection () {
    self.selectedSkills.clear()
    self.setAddSkillMode(false)
  }

  function addSkill (skill) {
    self.setAddSkillMode(false)
    self.selectedSkills.push(skill.id)
  }

  function setSingleSkillSelected (skill) {
    self.selectedSkills.clear()
    self.selectedSkills.push(skill.id)
  }

  function setExpand (expand) {
    if (expand !== self.expand) {
      self.skillsModel.basicInfo.viewEntity.changeModelVariant(expand ? 'StoriesFilterFocusModel' : 'default')
    }

    self.expand = expand
  }

  return {
    toggleAddSkillMode,
    setAddSkillMode,
    toggleExpand,
    clearSelection,
    addSkill,
    setSingleSkillSelected,
    setExpand
  }
})

export default StoriesFilter
