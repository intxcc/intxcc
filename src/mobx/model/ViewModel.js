'use strict'

import { types } from 'mobx-state-tree'

/**
 * Describes a guide line. The position of the guide is given by the view-scss-file.
 * The following for example states the div for the guide line with index 'a'
 * startpage.scss | .view-startpage .guide-a { ... }
 * INFO: The guide lines are placed on an edge of a helper div with the className '.guide-<index>'
 * @index - Name of the guide model
 * @deg - The angle of the guide line
 * @vpos - (top | bottom) vertical position on the div, for the guide
 * @hpos - (left | right) horizontal position on the div, for the guide
 */
const GuideModel = types.model({
  // index of map is the name of the guide model
  type: types.optional(types.string, 'div'),
  deg: types.optional(types.number, 0),
  intersect: types.optional(types.array(types.string), []),
  vpos: types.optional(types.string, ''),
  hpos: types.optional(types.string, '')
})

/**
 * A ViewModel describes the appearance of a View. That is the appearence of the guide lines and polygons.
 * @name - The name of the ViewModel
 * @guides - An object with all guide lines
 */
const ViewModel = types.model({
  name: types.string,
  guides: types.map(GuideModel)
})

export default ViewModel
