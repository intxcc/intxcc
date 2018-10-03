'use strict'

import { types } from 'mobx-state-tree'

import pathToRegexp from 'path-to-regexp'

import RootStoreModel from '../RootStoreModel'

import RoutingPaths from './RoutingPaths'

import POPUP_404 from '../../config/POPUP_404'

const FallBackPath = '/'

const RouterModel = types.model({
  rootStore: types.reference(types.late(() => RootStoreModel)),
  lastWorkingPath: types.optional(types.string, ''),
  path: types.optional(types.string, ''),

  // Required variables, because the structure of this website
  model: types.optional(types.string, ''),
  modelVariant: types.optional(types.string, '')
}).actions(self => {
  function initialize () {
    self.updateHash()

    // Accept the current path as working
    self.acceptPath()

    // Set the initial model to load
    self.rootStore.updateViewEntity('main', self.model)

    // Change active page variable, for easier accessibility of that variable
    self.rootStore.global.setActivePage(self.model)

    // TODO Initialize model variants as well
  }

  // Called only when the hash changes, not on initialisation
  function onHashChange (e) {
    self.updateHash()

    if (!self.rootStore.isTransitioning) {
      if (!self.rootStore.views.get('main') || self.model !== self.rootStore.views.get('main').model) {
        self.rootStore.startTransition(self.model)
      }
    } else {
      self.goToLastWorkingPath()
    }

    // Accept the current path as working
    self.acceptPath()
  }

  function acceptPath () {
    // Remember this, to revert changes that don't work
    self.lastWorkingPath = self.path
  }

  function goToLastWorkingPath () {
    // Set new location to fallback path or last working path
    if (self.lastWorkingPath === '') {
      window.history.pushState(null, null, '/#' + FallBackPath)
    } else {
      window.history.pushState(null, null, '/#' + self.lastWorkingPath)
    }

    // Synchronize the browsers path with saved path
    self.updateHash()
  }

  // Because we don't want to repeat anything and want to use this to initialize and to react to changed
  function updateHash () {
    // Delete hash sign, so we get a "real" path
    self.path = window.location.hash.substr(1)

    console.log('update hash: ' + self.path)

    // Get the actual information from the hash
    parsePath()
  }

  function parsePath () {
    // Check if one of our routes is matching
    let route
    for (let routeIndex in RoutingPaths) {
      route = RoutingPaths[routeIndex]
      const re = pathToRegexp(route.path)

      if (re.exec(self.path) !== null) {
        break
      } else {
        route = null
      }
    }

    // No route matched. Load fallback path
    if (route === null) {
      self.goToLastWorkingPath()

      // Show 404-popup after 500ms, when we can confidently assume that there is a main view entity
      setTimeout(function () {
        self.rootStore.views.get('main').stateBasicInfo.showPopup(POPUP_404)
      }, 500)

      return
    }

    self.model = route.model
  }

  return {
    initialize,
    onHashChange,
    acceptPath,
    goToLastWorkingPath,
    updateHash,
    parsePath
  }
})

export default RouterModel
