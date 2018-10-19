
'use strict'

import { types } from 'mobx-state-tree'

import SkillsModel from '../SkillsModel'

const StoriesFilter = types.model({
  expand: types.optional(types.boolean, false),
  skillsModel: types.optional(types.reference(types.late(() => SkillsModel)), 'skillsState')
}).actions(self => {
  function toggleExpand () {
    self.setExpand(!self.expand)
  }

  function setExpand (expand) {
    if (expand !== self.expand) {
      self.skillsModel.basicInfo.viewEntity.changeModelVariant(expand ? 'StoriesFilterFocusModel' : 'default')
    }

    self.expand = expand
  }

  return {
    toggleExpand,
    setExpand
  }
})

export default StoriesFilter
