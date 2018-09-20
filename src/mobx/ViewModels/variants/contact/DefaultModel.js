'use strict'

import Defaults from '../../../../config/defaults'
import Colors from '../../../../../style/variables/colors.scss'

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
      vpos: 'bottom',
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
    },
    // Helper lines for bottom left caption //
    'blc00': {
      type: 'intersection',
      deg: 90,
      intersect: [
        'a', 'c'
      ],
      move: 100
    },
    'blc0': {
      type: 'copy',
      copy: 'blc00',
      deg: -6
    },
    'blc1': {
      type: 'copy',
      copy: 'blc00',
      deg: -60,
      move: 45
    },
    'blc2': {
      type: 'copy',
      copy: 'blc00',
      deg: 22
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
    'PinkTriangle': {
      fill: '#fff',
      stroke: Colors.primaryColor,
      points: [
        ['blc0', 'blc1'],
        ['blc2', 'blc0'],
        ['blc2', 'blc1']
      ]
    }
  },
  objects: {
    'contact-page-name-display': {
      type: 'intersections',
      intersections: [
        ['blc0', 'blc1']
      ]
    }
  }
}

export default VariantModel
