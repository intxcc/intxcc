'use strict'

import ViewModel from './model/ViewModel'

import StartpageModel from './ViewModels/StartpageModel'

/**
 * Load all models here at the beginning. They are never changed, but are referenced by a ViewEntity
 */
const viewModels = {
  [StartpageModel.name]: ViewModel.create(StartpageModel)
}

export default viewModels
