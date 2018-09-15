'use strict'

import { types } from 'mobx-state-tree'

import GlobalModel from './model/GlobalModel'

import ViewModel from './model/ViewModel'
import ViewEntity from './model/ViewEntity'

import viewModels from './viewModels'
import viewEntities from './viewEntities'

import StateModel from './StateModels/StateModel'
import StateData from './StateData/StateData'

const RootStore = types.model({
  viewModels: types.map(ViewModel),
  views: types.map(ViewEntity),
  global: GlobalModel,
  state: StateModel
}).views(self => ({
  get isTransitioning () {
    if (self.views.get('main')) {
      if (self.views.get('main').transitionState !== '') {
        return true
      }
    }

    return false
  }
})).actions(self => {
  function startTransition (modelName) {
    if (!self.viewModels.get(modelName)) {
      console.error('No viewModel with the name: ' + modelName)
      return
    }

    if (self.views.get('main')) {
      if (self.isTransitioning) {
        console.warn('Main view is already transitioning. Abort new transition.')
        return
      }

      self.setViewEntity('buffer', modelName)
      self.views.get('main').startTransition()
    } else {
      self.setViewEntity('main', modelName)
    }
  }

  function setViewEntity (viewName, modelName) {
    self.views.set(viewName, ViewEntity.create({
      model: modelName
    }))
  }

  function updateViewEntity (viewName, modelName) {
    self.views.delete(viewName)

    // Wait for the deletion to propagate and then set the new view
    setTimeout(() => {
      self.setViewEntity(viewName, modelName)
    }, 0)
  }

  return {
    startTransition,
    setViewEntity,
    updateViewEntity
  }
})

const store = RootStore.create({
  viewModels: viewModels,
  views: viewEntities,
  global: GlobalModel.create(),
  state: StateModel.create(StateData)
})

export default store
