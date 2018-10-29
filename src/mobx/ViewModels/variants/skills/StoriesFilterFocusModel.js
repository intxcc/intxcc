'use strict'

import DefaultModel from './DefaultModel'

/** This model is active, to expand the stories filter on the skills page. */
const StoriesFilterFocusModel = JSON.parse(JSON.stringify(DefaultModel))

StoriesFilterFocusModel.className = 'variant--stories-filter-focus'

StoriesFilterFocusModel.guides['d'] = {
  deg: -90,
  vpos: 'top',
  hpos: 'right'
}

StoriesFilterFocusModel.guides['e'] = {
  type: 'intersection',
  deg: 0,
  intersect: [
    'a', 'c'
  ]
}

StoriesFilterFocusModel.polygons['SkillsPolyA'].points = [
  ['a', 'b'],
  ['a', 'c'],
  ['d', 'e'],
  ['b', 'c']
]

export default StoriesFilterFocusModel
