'use strict'

import { types } from 'mobx-state-tree'

import GlobalModel from './model/GlobalModel'
import RouterModel from './Router/RouterModel'
import StateModel from './StateModels/StateModel'

import ViewModel from './model/ViewModel'
import ViewEntity from './model/ViewEntity'

const RootStoreModel = types.model({
  id: types.identifier,
  router: RouterModel,
  viewModels: types.map(ViewModel),
  views: types.map(ViewEntity),
  global: GlobalModel,
  state: StateModel
}).views(self => ({
  get isTransitioning () {
    if (self.views.get('main')) {
      if (self.views.get('main').transitionState !== '' || self.views.get('main').cooldown) {
        return true
      } else {
        return false
      }
    }

    return true
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
      id: viewName,
      model: modelName
    }))

    // Let the new main cooldown for 200ms before transitioning again, to prevent some race conditions, that were the cause of a freezed main view bug
    if (viewName === 'main') {
      setTimeout(() => {
        self.views.get('main').stopCooldown()
      }, 200)
    }
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

export default RootStoreModel
