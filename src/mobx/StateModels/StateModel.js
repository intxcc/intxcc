'use strict'

import { types } from 'mobx-state-tree'

import StartpageModel from './StartpageModel'
import StoriesModel from './StoriesModel'
import SkillsModel from './SkillsModel'

const StateModel = types.model({
  startpage: StartpageModel,
  stories: StoriesModel,
  skills: SkillsModel
})

export default StateModel
