'use strict'

import ViewModel from './model/ViewModel'

import StartpageModel from './ViewModels/StartpageModel'
import StoriesModel from './ViewModels/StoriesModel'
import SkillsModel from './ViewModels/SkillsModel'
import ContactModel from './ViewModels/ContactModel'

/**
 * Load all models here at the beginning. They are never changed, but are referenced by a ViewEntity
 */
const viewModels = {
  [StartpageModel.name]: ViewModel.create(StartpageModel),
  [StoriesModel.name]: ViewModel.create(StoriesModel),
  [SkillsModel.name]: ViewModel.create(SkillsModel),
  [ContactModel.name]: ViewModel.create(ContactModel)
}

export default viewModels
