
'use strict'

import { types } from 'mobx-state-tree'

import SkillsModel from '../SkillsModel'
import StoriesModel from '../StoriesModel'

import SkillModel from './SkillModel'

import { getNameIdentifierFromSkill } from '../../../miscFunctions'

const StoriesFilter = types.model({
  expand: types.optional(types.boolean, false),
  selectedSkills: types.optional(types.array(types.reference(SkillModel)), []),
  skillsModel: types.optional(types.reference(types.late(() => SkillsModel)), 'skillsState'),
  storiesModel: types.optional(types.reference(types.late(() => StoriesModel)), 'storiesState'),
  addSkillMode: types.optional(types.boolean, false)
}).volatile(self => ({
  // For duplicate checking
  selectedSkillsMap: {}
})).views(self => ({
  // TODO Move to a webworker and/or create an index: skill -> arrayOfStories[...]
  get filteredStories () {
    // Check if the story has ALL selected skills
    return self.storiesModel.stories.filter(story => {
      let storyPassed = true

      // Go through all selected skills
      for (let selectionSkill of self.selectedSkills) {
        let storyHasSkill = false

        // Look if any of the skills in the story is the selected skill
        for (let storySkill of story.skills) {
          if (getNameIdentifierFromSkill(selectionSkill) === getNameIdentifierFromSkill({title: storySkill})) {
            storyHasSkill = true
            break
          }
        }

        // If skill is not in story, break and return false
        if (!storyHasSkill) {
          storyPassed = false
          break
        }
      }

      return storyPassed
    }) || []
  }
})).actions(self => {
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

  function deleteLastSelection () {
    self.selectedSkills.remove(self.selectedSkills.get(self.selectedSkills.length - 1))
  }

  function clearSelection () {
    // Empty object for duplicate checking
    self.selectedSkillsMap = {}

    self.selectedSkills.clear()
    self.setAddSkillMode(false)
  }

  function addSkill (skill) {
    self.setAddSkillMode(false)

    // If skill is already in selection, ignore
    if (self.selectedSkillsMap[skill.id]) {
      return
    }
    self.selectedSkillsMap[skill.id] = 'selected'

    // Add skill to selection
    self.selectedSkills.push(skill.id)
  }

  function setSingleSkillSelected (skill) {
    self.clearSelection()

    // If skill is already in selection, ignore
    if (self.selectedSkillsMap[skill.id]) {
      return
    }
    self.selectedSkillsMap[skill.id] = 'selected'

    // Add skill to selection
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
    deleteLastSelection,
    clearSelection,
    addSkill,
    setSingleSkillSelected,
    setExpand
  }
})

export default StoriesFilter
