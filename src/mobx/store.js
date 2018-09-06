'use strict'

import { types } from 'mobx-state-tree'

import GlobalModel from './model/GlobalModel'

import ViewModel from './model/ViewModel'
import ViewEntity from './model/ViewEntity'

import viewModels from './viewModels'
import viewEntities from './viewEntities'

const RootStore = types.model({
  viewModels: types.map(ViewModel),
  views: types.map(ViewEntity),
  global: GlobalModel
})

const store = RootStore.create({
  viewModels: viewModels,
  views: viewEntities,
  global: GlobalModel.create()
})

export default store
