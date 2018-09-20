'use strict'

import Defaults from '../../../../config/defaults'

// This is the ViewModel of the contact view

const VariantModel = {
  guides: {
    'a': {
      deg: -25.5,
      vpos: 'top',
      hpos: 'right'
    },
    'b': {
      deg: -79,
      vpos: 'top',
      hpos: 'right'
    },
    'c': {
      deg: 16,
      vpos: 'top',
      hpos: 'right'
    },
    // //////// //
    // Strokes //
    'f': {
      type: 'copy',
      hide: true,
      copy: 'a',
      move: 25
    },
    'g': {
      type: 'copy',
      hide: true,
      reverse: true,
      copy: 'b',
      move: 25
    },
    'h': {
      type: 'copy',
      hide: true,
      reverse: true,
      copy: 'c',
      move: 25
    }
  },
  polygons: {
    'B': {
      fill: Defaults.PolygonFill,
      points: [
        ['a', 'b'],
        ['a', 'c'],
        ['b', 'c']
      ]
    },
    'C': {
      fill: '#00000000',
      stroke: '#fff',
      points: [
        ['h', 'f'],
        ['h', 'g'],
        ['f', 'g']
      ]
    },
  }
}

export default VariantModel
