'use strict'

import { types } from 'mobx-state-tree'

import StoriesModel from './StoriesModel'
import SkillsModel from './SkillsModel'

const StateModel = types.model({
  stories: StoriesModel,
  skills: SkillsModel
})

export default StateModel
