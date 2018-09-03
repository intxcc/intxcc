'use strict'

import { types } from 'mobx-state-tree'

import ViewModel from './model/ViewModel'
import ViewEntity from './model/ViewEntity'

import viewModels from './viewModels'
import viewEntities from './viewEntities'

const RootStore = types.model({
  viewModels: types.map(ViewModel),
  views: types.map(ViewEntity)
})

const store = RootStore.create({
  viewModels: viewModels,
  views: viewEntities
})

export default store
