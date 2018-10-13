'use strict'

import { types } from 'mobx-state-tree'

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
    return self.clientWidth < 600
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
  // ATTENTION: Changes only the variable in the global model, does not change the active page
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
