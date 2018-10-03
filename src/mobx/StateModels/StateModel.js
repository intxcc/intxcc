'use strict'

import { types } from 'mobx-state-tree'

import StartpageModel from './StartpageModel'
import AboutModel from './AboutModel'
import StoriesModel from './StoriesModel'
import SkillsModel from './SkillsModel'
import ContactModel from './ContactModel'

const StateModel = types.model({
  startpage: StartpageModel,
  about: AboutModel,
  stories: StoriesModel,
  skills: SkillsModel,
  contact: ContactModel
})

export default StateModel
