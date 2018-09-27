'use strict'

import Colors from '../../../../../style/variables/colors.scss'
import Defaults from '../../../../config/defaults'

// This is the ViewModel of the contact view

const VariantModel = {
  guides: {
    // //////// //
    // white tri //
    'w1': {
      deg: -65,
      vpos: 'top',
      hpos: 'right'
    },
    'w2': {
      deg: 55,
      vpos: 'top',
      hpos: 'right'
    },
    'w3': {
      deg: -12,
      vpos: 'bottom',
      hpos: 'left'
    },
    // //////// //
    // pink tri //
    'p1': {
      type: 'copy',
      hide: true,
      copy: 'w1',
      move: 5
    },
    'p2': {
      type: 'copy',
      hide: true,
      copy: 'w2',
      move: 5
    },
    'p3': {
      type: 'copy',
      hide: true,
      reverse: true,
      copy: 'w3',
      move: 5
    },
    'blc0': {
      deg: 9.5,
      vpos: 'top',
      hpos: 'left'
    },
    'blc1': {
      deg: -41.5,
      vpos: 'top',
      hpos: 'right'
    },
    'blc2': {
      deg: 44,
      vpos: 'top',
      hpos: 'left'
    }
  },
  polygons: {
    'AboutPinkTriangleBackground': {
      morphTo: ['LeftTriangleA', 'AboutPinkTriangleBackground', 'B', 'D'],
      fill: Defaults.White,
      stroke: Defaults.White,
      points: [
        ['w1', 'w2'],
        ['w1', 'w3'],
        ['w2', 'w3']
      ]
    },
    'AboutPinkTriangle': {
      morphTo: ['PinkTriangle', 'PinkTriangle', 'RightTriangleA', 'A', 'C', 'SkillsPolyA'],
      fill: Defaults.White,
      stroke: Colors.primaryColor,
      points: [
        ['p1', 'p2'],
        ['p1', 'p3'],
        ['p2', 'p3']
      ]
    },
    'PinkTriangle': {
      morphTo: ['PinkTriangle', 'AboutPinkTriangle'],
      fill: Defaults.White,
      stroke: Colors.primaryColor,
      points: [
        ['blc0', 'blc1'],
        ['blc2', 'blc0'],
        ['blc2', 'blc1']
      ]
    }
  }
}

export default VariantModel