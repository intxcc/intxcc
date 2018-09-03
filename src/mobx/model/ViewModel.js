'use strict'

import { types } from 'mobx-state-tree'

/**
 * Describes a guide line
 * @deg - The angle of the guide line
 */
const Guide = types.model({
  deg: types.optional(types.number, 0)
})

/**
 * A ViewModel describes the appearance of a View. That is the appearence of the guide lines and polygons.
 * @name - The name of the ViewModel
 * @guides - An object with all guide lines
 */
const ViewModel = types.model({
  name: types.string,
  guides: types.map(Guide)
})

export default ViewModel
