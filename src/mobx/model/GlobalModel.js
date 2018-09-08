'use strict'

import { types } from 'mobx-state-tree'
import { keys } from 'mobx'

const BoundingClientRectModel = types.model({
  x: types.number,
  y: types.number,
  width: types.number,
  height: types.number,
  top: types.number,
  right: types.number,
  bottom: types.number,
  left: types.number
})

/**
 * Describes the global object with globally relevant information
 */
const GlobalModel = types.model({
  clientWidth: types.optional(types.number, 0),
  clientHeight: types.optional(types.number, 0),
  viewContentRect: types.optional(BoundingClientRectModel, {
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }),
  contentWrapperRect: types.optional(BoundingClientRectModel, {
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  })
}).views(self => ({
  get svgViewBox () {
    if (self.contentWrapperRect.right > self.clientWidth - 10) {
      let y = self.contentWrapperRect.top

      // Marker GMVHPX
      if (self.viewContentRect.height - self.contentWrapperRect.top >= 450) {
        y = -(450 - self.viewContentRect.height)
      }

      return `${-self.contentWrapperRect.x} ${-y} ${self.viewContentRect.width} ${self.viewContentRect.height}`
    } else {
      return `0 0 ${self.clientWidth} ${self.clientHeight}`
    }
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

  function setContentWrapperRect (rect) {
    for (let key of keys(self.contentWrapperRect)) {
      self.contentWrapperRect[key] = rect[key]
    }
  }

  function setViewContentRect (rect) {
    for (let key of keys(self.viewContentRect)) {
      self.viewContentRect[key] = rect[key]
    }
  }

  return {
    setClientDimensions,
    setContentWrapperRect,
    setViewContentRect
  }
})

export default GlobalModel
