'use strict'

import RootStoreModel from './RootStoreModel'
import RouterModel from './Router/RouterModel'
import GlobalModel from './model/GlobalModel'

import viewModels from './viewModels'
import viewEntities from './viewEntities'

import StateModel from './StateModels/StateModel'
import StateData from './StateData/StateData'

// Create an entity of the RootStoreModel
const store = RootStoreModel.create({
  id: 'root-store',
  router: RouterModel.create({
    rootStore: 'root-store'
  }),
  viewModels: viewModels,
  views: viewEntities,
  global: GlobalModel.create(),
  state: StateModel.create(StateData)
})

export default store
