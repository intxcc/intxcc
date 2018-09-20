'use strict'

import { types } from 'mobx-state-tree'

/**
 * Describes the global object with globally relevant information
 */
const GlobalModel = types.model({
  clientWidth: types.optional(types.number, 0),
  clientHeight: types.optional(types.number, 0),
  logoClassName: types.optional(types.string, '')
}).views(self => ({
  get pixelScale () {
    const minLength = Math.min(self.clientHeight, self.clientWidth)
    return minLength / 1000
  },
  get svgViewBox () {
    return `0 0 ${self.clientWidth} ${self.clientHeight}`
  },
  get strokeWidth () {
    const max = Math.max(self.clientWidth, self.clientHeight)
    return (((max - 800) / 1920) * 3) + 1
  }
})).actions(self => {
  function setClientDimensions (clientWidth, clientHeight) {
    self.clientWidth = clientWidth
    self.clientHeight = clientHeight
  }

  return {
    setClientDimensions
  }
})

export default GlobalModel
