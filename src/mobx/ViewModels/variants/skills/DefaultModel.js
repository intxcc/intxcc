'use strict'

import Defaults from '../../../../config/defaults'

// This is the ViewModel of the skills view

const VariantModel = {
  guides: {
    'a': {
      deg: -60,
      vpos: 'top',
      hpos: 'right'
    },
    'b': {
      deg: 60,
      vpos: 'top',
      hpos: 'right'
    },
    'c': {
      deg: -30,
      vpos: 'bottom',
      hpos: 'left'
    },
    // Stub for layout-stories-filter-focus-variant
    'd': {},
    'e': {}
  },
  polygons: {
    'SkillsPolyA': {
      morphTo: ['A', 'B', 'D', 'AboutPinkTriangle'],
      fill: Defaults.White,
      stroke: Defaults.DefaultStroke,
      strokeWidth: 15,
      points: [
        ['a', 'b'],
        ['a', 'c'],
        ['b', 'c'],
        ['b', 'c']
      ]
    }
  },
  objects: {
    'stories-overlay-title': {
      type: 'intersections',
      copyDeg: 'b',
      intersections: [
        ['a', 'b'],
        ['b', 'c']
      ]
    },
    'stories-overlay-inner': {
      type: 'intersections',
      copyDeg: 'c',
      intersections: [
        ['b', 'c']
      ]
    }
  }
}

export default VariantModel
