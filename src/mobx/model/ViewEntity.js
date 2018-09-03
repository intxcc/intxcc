'use strict'

import { types } from 'mobx-state-tree'

/**
 * Describes the model of an View object. The model given describes the appearance of the polygons and guide lines.
 */
const ViewEntiry = types.model({
  // Name of the ViewModel
  model: types.string
})

export default ViewEntiry
