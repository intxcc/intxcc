'use strict'

import { types } from 'mobx-state-tree'

import Defaults from '../../config/defaults'

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
  reverse: types.optional(types.boolean, false),
  hide: types.optional(types.boolean, false),
  copy: types.optional(types.string, ''),
  move: types.optional(types.number, 0),
  deg: types.optional(types.number, 0),
  intersect: types.optional(types.array(types.string), []),
  vpos: types.optional(types.string, ''),
  hpos: types.optional(types.string, '')
})

/**
 * Describes a polygon. The points property is an array (1) of arrays (2) with guide names. Array (2) has always a length of 2. Like: [...['a', 'b']]. This will result one point of beeing at the intersection between guide 'a' and guide 'b'.
 */
const PolygonModel = types.model({
  // index of map is the name of the polygon model
  fill: types.optional(types.string, Defaults.PolygonFill),
  stroke: types.optional(types.string, Defaults.PolygonStroke),
  points: types.array(types.array(types.string))
})

/**
 * A ViewModel describes the appearance of a View. That is the appearence of the guide lines and polygons.
 * @name - The name of the ViewModel
 * @guides - An object with all guide lines
 */
const ViewModel = types.model({
  name: types.string,
  guides: types.map(GuideModel),
  polygons: types.map(PolygonModel)
})

export default ViewModel
