'use strict'

import { types } from 'mobx-state-tree'

import pathToRegexp from 'path-to-regexp'

import RootStoreModel from '../RootStoreModel'

import RoutingPaths from './RoutingPaths'

import Defaults from '../../config/defaults'
const FallBackPath = '/'

const RouterModel = types.model({
  rootStore: types.reference(types.late(() => RootStoreModel)),
  lastWorkingPath: types.optional(types.string, ''),
  path: types.optional(types.string, ''),

  // To tell the fallback to show a 404 on the active page
  fallbackShow404Popup: types.optional(types.boolean, false),

  // Required variables, because the structure of this website
  model: types.optional(types.string, ''),
  modelVariant: types.optional(types.string, ''),

  // Optional variables
  params: types.optional(types.map(types.string), {}),

  // Private variables. IMPORTANT: Only to be used in this model
  nextModel: types.optional(types.string, ''),
  nextModelVariant: types.optional(types.string, ''),
  nextParams: types.optional(types.map(types.string), {})
}).actions(self => {
  function initialize () {
    self.updateHash()

    // Accept the current path as working
    self.acceptPath()

    // Set the initial model to load
    self.rootStore.updateViewEntity('main', self.model)

    // Change active page variable, for easier accessibility of that variable
    self.rootStore.global.setActivePage(self.model)
  }

  // Called only when the hash changes, not on initialisation
  function onHashChange () {
    self.updateHash()

    if (self.rootStore.global.useFallback) {
      self.rootStore.global.setActivePage(self.nextModel)
      self.acceptPath()
    } else {
      // If the nextmodel is the same as the current one, we can ignore the isTransitioning parameter
      if (!self.rootStore.isTransitioning || self.nextModel === self.model) {
        // Only transition if this is not the first render and the model actually changed
        if (!self.rootStore.views.get('main') || (self.nextModel !== self.model && self.nextModel !== self.rootStore.views.get('main').model)) {
          self.rootStore.startTransition(self.nextModel)
        }

        // Accept the current path as working. Do this here, because this will change the model and make nextModel and model the same.
        self.acceptPath()
      } else {
        self.goToLastWorkingPath()
      }
    }
  }

  // This finally accepts the path as valid and accepts the variables it has given
  function acceptPath () {
    // Remember this, to revert changes that don't work
    self.lastWorkingPath = self.path

    // Only clear paramaters is the view model changed
    if (self.model !== self.nextModel) {
      self.params.clear()
    }

    // Load new params from the already parsed path, which wrote them to nextParams
    for (let paramIndex in self.nextParams.toJSON()) {
      const paramValue = self.nextParams.get(paramIndex)
      self.params.set(paramIndex, paramValue)
    }

    // Catch if the new params has less items than the old ones and propagate this change
    for (let paramIndex in self.params.toJSON()) {
      if (typeof self.nextParams.get(paramIndex) === 'undefined') {
        self.params.set(paramIndex, '')

        // Only propagate once and then delete the param at the end of the event queue
        setTimeout(() => self.deleteRouterParam(paramIndex), 0)
      }
    }

    // Change document title only when title is not empty
    if (self.nextTitle !== '') {
      const newTitle = self.nextTitle + ' | ' + Defaults.BasicTitle
      document.title = newTitle

      // Only if the view model changed track the page view
      if (self.model !== self.nextModel) {
        /* eslint-disable */
        _paq.push(['setCustomUrl', '/' + window.location.hash.substr(1)])
        _paq.push(['setDocumentTitle', newTitle])
        _paq.push(['trackPageView'])
        /* eslint-enable */
      }
    }

    // Accept model
    self.model = self.nextModel
  }

  function deleteRouterParam (paramIndex) {
    self.params.delete(paramIndex)
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

    // Get the actual information from the hash
    parsePath()
  }

  function resetFallbackShow404Popup () {
    self.fallbackShow404Popup = false
  }

  function parsePath () {
    // Check if one of our routes is matching
    let route
    let routeValues
    let routeKeys
    for (let routeIndex in RoutingPaths) {
      route = RoutingPaths[routeIndex]

      // Reset route keys, so not old ones are given when parsing the params. This might happen, if the next view has no keys
      routeKeys = []
      const re = pathToRegexp(route.path, routeKeys)

      routeValues = re.exec(self.path)
      if (routeValues !== null) {
        break
      } else {
        route = null
      }
    }

    // No route matched. Load fallback path
    if (route === null) {
      self.goToLastWorkingPath()

      if (!self.rootStore.global.useFallback) {
        // Show popup-404 after 500ms, when we can confidently assume that there is a main view entity
        setTimeout(function () {
          self.rootStore.views.get('main').stateBasicInfo.show404Popup()
        }, 500)
      }

      self.fallbackShow404Popup = true

      return
    }

    // Preload variables, they will get set finally, after the path was accepted
    self.nextParams.clear()
    for (let paramIndexString in routeKeys) {
      const paramIndex = parseInt(paramIndexString)

      // The +1 because the index 0 will always contain the full path
      let paramValue = routeValues[paramIndex + 1]
      let paramKey = routeKeys[paramIndex].name

      self.nextParams.set(paramKey, paramValue)
    }

    self.nextTitle = route.title
    self.nextModel = route.model
  }

  return {
    initialize,
    onHashChange,
    acceptPath,
    deleteRouterParam,
    goToLastWorkingPath,
    updateHash,
    resetFallbackShow404Popup,
    parsePath
  }
})

export default RouterModel
