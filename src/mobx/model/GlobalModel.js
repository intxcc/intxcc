'use strict'

import { types } from 'mobx-state-tree'

import RootStoreModel from '../RootStoreModel'

import Defaults from '../../config/defaults'

/**
 * Describes the global object with globally relevant information
 */
const GlobalModel = types.model({
  rootStore: types.optional(types.reference(types.late(() => RootStoreModel)), 'root-store'),
  clientWidth: types.optional(types.number, 0),
  clientHeight: types.optional(types.number, 0),
  logoClassName: types.optional(types.string, ''),
  activePage: types.optional(types.string, ''),
  showBurgerMenu: types.optional(types.boolean, false),
  fallbackShowControls: types.optional(types.boolean, true)
}).views(self => ({
  // Here we will decide if we render the fallback or not
  get useFallback () {
    const isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g)

    const shouldUseFallback = (self.clientHeight / self.clientWidth) > 0.8 ||
      self.clientWidth < 960 ||
      isIE

    if (Defaults.neverUseFallback) {
      return false
    }

    return shouldUseFallback || Defaults.alwaysUseFallback
  },
  // Pixel scale is used to get dimension independent pixels
  get pixelScale () {
    const minLength = Math.min(self.clientHeight, self.clientWidth)
    return minLength / 1000
  },
  get svgViewBox () {
    return `0 0 ${self.clientWidth} ${self.clientHeight}`
  }
})).volatile(self => ({
  fallbackLastScrollTop: 0
})).actions(self => {
  // ATTENTION: Changes only the variable in the global model, DOES NOT change the active page.
  // This variable is really important for the fallback, the fallback DOES change the active page with this variable
  function setActivePage (activePage) {
    self.activePage = activePage
  }

  function setFallbackShowControls (fallbackShowControls) {
    self.fallbackShowControls = fallbackShowControls
  }

  function fallbackOnScroll (scrollTop) {
    const newFallbackShowControls = self.fallbackLastScrollTop > scrollTop

    if ((scrollTop > self.fallbackLastScrollTop + 10) ||
      (scrollTop < self.fallbackLastScrollTop - 10)) {
      self.fallbackLastScrollTop = scrollTop
      self.fallbackShowControls = newFallbackShowControls
    }
  }

  function setShowBurgerMenu (showBurgerMenu) {
    self.showBurgerMenu = showBurgerMenu
  }

  function setClientDimensions (clientWidth, clientHeight) {
    self.clientWidth = clientWidth
    self.clientHeight = clientHeight

    // Let the state of the actrive page know, that the window was resized
    const activeState = self.rootStore.state[self.activePage]
    if (activeState && activeState.onResize && typeof activeState.onResize === 'function') {
      activeState.onResize()
    }
  }

  return {
    setActivePage,
    setFallbackShowControls,
    fallbackOnScroll,
    setShowBurgerMenu,
    setClientDimensions
  }
})

export default GlobalModel
