
'use strict'

import { types } from 'mobx-state-tree'

import SkillsModel from '../SkillsModel'

const StoriesFilter = types.model({
  show: types.optional(types.boolean, false),
  skillsModel: types.optional(types.reference(types.late(() => SkillsModel)), 'skillsState')
}).actions(self => {
  function toggleShow () {
    self.setShow(!self.show)
  }

  function setShow (show) {
    if (show !== self.show) {
      self.skillsModel.basicInfo.viewEntity.changeModelVariant(show ? 'StoriesFilterFocusModel' : 'default')
    }

    self.show = show
  }

  return {
    toggleShow,
    setShow
  }
})

export default StoriesFilter
