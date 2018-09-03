'use strict'

import ViewModel from './model/ViewModel'

import StartpageModel from './ViewModels/StartpageModel'

const viewModels = {
  [StartpageModel.name]: ViewModel.create(StartpageModel)
}

export default viewModels
