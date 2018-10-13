'use strict'

import { types } from 'mobx-state-tree'

import Defaults from '../../config/defaults'

/**
 * Describes the global object with globally relevant information
 */
const GlobalModel = types.model({
  clientWidth: types.optional(types.number, 0),
  clientHeight: types.optional(types.number, 0),
  logoClassName: types.optional(types.string, ''),
  activePage: types.optional(types.string, ''),
  showBurgerMenu: types.optional(types.boolean, false)
}).views(self => ({
  // Here we will decide if we render the fallback or not
  get useFallback () {
    const shouldUseFallback = (self.clientHeight / self.clientWidth) > 0.8 ||
      self.clientWidth < 960

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
})).actions(self => {
  // ATTENTION: Changes only the variable in the global model, DOES NOT change the active page.
  // This variable is really important for the fallback, the fallback DOES change the active page with this variable
  function setActivePage (activePage) {
    self.activePage = activePage
  }

  function setShowBurgerMenu (showBurgerMenu) {
    self.showBurgerMenu = showBurgerMenu
  }

  function setClientDimensions (clientWidth, clientHeight) {
    self.clientWidth = clientWidth
    self.clientHeight = clientHeight
  }

  return {
    setActivePage,
    setShowBurgerMenu,
    setClientDimensions
  }
})

export default GlobalModel
