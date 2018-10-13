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
  activePage: types.optional(types.string, '')
}).views(self => ({
  // Here we will decide if we render the fallback or not
  get useFallback () {
    const shouldUseFallback = (self.clientHeight / self.clientWidth) > 0.7
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

  function setClientDimensions (clientWidth, clientHeight) {
    self.clientWidth = clientWidth
    self.clientHeight = clientHeight
  }

  return {
    setActivePage,
    setClientDimensions
  }
})

export default GlobalModel
