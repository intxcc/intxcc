'use strict'

import { types } from 'mobx-state-tree'

/**
 * Describes the global object with globally relevant information
 */
const GlobalModel = types.model({
  clientWidth: types.optional(types.number, 0),
  clientHeight: types.optional(types.number, 0)
}).views(self => ({
  get svgViewBox () {
    return `0 0 ${self.clientWidth} ${self.clientHeight}`
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
