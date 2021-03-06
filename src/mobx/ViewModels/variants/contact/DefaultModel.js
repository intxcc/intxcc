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
      deg: -74,
      vpos: 'top',
      hpos: 'right'
    },
    'c': {
      deg: 16,
      vpos: 'bottom',
      hpos: 'right'
    },
    // Left polygon with black stroke
    'lp-a': {
      deg: 90,
      vpos: 'top',
      hpos: 'left'
    },
    'lp-b': {
      deg: 75,
      vpos: 'top',
      hpos: 'left'
    },
    'lp-c': {
      deg: 34,
      vpos: 'bottom',
      hpos: 'right'
    },
    // Left top polygon with black stroke
    'ltp-a': {
      deg: 16,
      vpos: 'top',
      hpos: 'right'
    },
    'ltp-b': {
      deg: 75,
      vpos: 'bottom',
      hpos: 'left'
    },
    'ltp-c': {
      deg: -25,
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
      move: 10,
      deg: -6
    },
    'blc1': {
      type: 'copy',
      copy: 'blc00',
      deg: -60,
      move: 40
    },
    'blc2': {
      type: 'copy',
      copy: 'blc00',
      move: 15,
      deg: 22
    }
  },
  polygons: {
    'A': {
      morphTo: ['A', 'SkillsPolyA', 'AboutPinkTriangle'],
      fill: 'rgba(0,0,0,0)',
      stroke: Defaults.DefaultStroke,
      strokeWidth: 15,
      points: [
        ['lp-a', 'lp-b'],
        ['lp-a', 'lp-c'],
        ['lp-b', 'lp-c']
      ]
    },
    'B': {
      morphTo: ['B', 'SkillsPolyA', 'AboutPinkTriangle'],
      fill: Defaults.PolygonFill,
      stroke: Defaults.White,
      points: [
        ['a', 'b'],
        ['a', 'c'],
        ['b', 'c']
      ]
    },
    'C': {
      morphTo: ['C', 'SkillsPolyA', 'AboutPinkTriangle'],
      fill: 'rgba(0,0,0,0)',
      stroke: Defaults.White,
      points: [
        ['h', 'f'],
        ['h', 'g'],
        ['f', 'g']
      ]
    },
    'D': {
      fill: Defaults.White,
      morphTo: ['D', 'SkillsPolyA', 'AboutPinkTriangle'],
      stroke: Defaults.DefaultStroke,
      strokeWidth: 15,
      points: [
        ['ltp-a', 'ltp-b'],
        ['ltp-a', 'ltp-c'],
        ['ltp-b', 'ltp-c']
      ]
    },
    'PinkTriangle': {
      morphTo: ['PinkTriangle', 'AboutPinkTriangle', 'SkillsPolyA'],
      fill: Defaults.White,
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
    },
    'contact-page-impressum': {
      type: 'intersections',
      copyDeg: 'b',
      intersections: [
        ['g', 'h']
      ]
    },
    'contact-page-social': {
      type: 'intersections',
      copyDeg: 'a',
      intersections: [
        // ['a', 'b'],
        ['a', 'c']
      ]
    }
  }
}

export default VariantModel
