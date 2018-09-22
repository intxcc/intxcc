'use strict'

import Defaults from '../../../../config/defaults'
import Colors from '../../../../../style/variables/colors.scss'

// This is the ViewModel of the stories view

const VariantModel = {
  guides: {
    'a': {
      deg: -14.556,
      vpos: 'top',
      hpos: 'right'
    },
    'b': {
      deg: -27,
      vpos: 'top',
      hpos: 'right'
    },
    'c': {
      deg: -151,
      vpos: 'top',
      hpos: 'right'
    },
    // //////// //
    'd': {
      deg: -151,
      vpos: 'top',
      hpos: 'right'
    },
    // Guide line on the left of the triangle for the name of the project
    'e': {
      type: 'intersection',
      intersect: [
        'a', 'd'
      ],
      deg: -90
    },
    // //////// //
    'bb': {
      deg: -27,
      vpos: 'top',
      hpos: 'right'
    },
    // Guide line at middle of the 2nd triangle for the name of the project
    'cc': {
      type: 'intersection',
      hide: true,
      deg: 0,
      intersect: [
        'd', 'b'
      ]
    },
    'dd': {
      deg: 57,
      vpos: 'top',
      hpos: 'right'
    },
    'ee': {
      type: 'intersection',
      deg: 37,
      intersect: [
        'cc', 'dd'
      ]
    },
    'ff': {
      deg: 90,
      vpos: 'top',
      hpos: 'left'
    },
    'gg': {
      deg: -78,
      vpos: 'top',
      hpos: 'left'
    },
    // //////// //
    // Strokes //
    'f': {
      type: 'copy',
      hide: true,
      copy: 'a',
      move: 12
    },
    'g': {
      type: 'copy',
      hide: true,
      reverse: true,
      copy: 'b',
      move: 12
    },
    'h': {
      type: 'copy',
      hide: true,
      copy: 'c',
      move: 12
    },
    // //////// //
    'i': {
      type: 'copy',
      hide: true,
      reverse: true,
      copy: 'b',
      move: 12
    },
    'j': {
      type: 'copy',
      hide: true,
      reverse: true,
      copy: 'd',
      move: 12
    },
    'k': {
      type: 'copy',
      hide: true,
      copy: 'e',
      move: 12
    },
    // Helper lines for bottom left caption //
    'blc0': {
      deg: 16,
      vpos: 'top',
      hpos: 'right'
    },
    'blc1': {
      deg: -56,
      vpos: 'top',
      hpos: 'right'
    },
    'blc2': {
      deg: -27,
      vpos: 'top',
      hpos: 'right'
    }
  },
  polygons: {
    'A_WhiteStroke_Outer': {
      stroke: '#fff',
      fill: '#00000000',
      strokeWidth: 10,
      points: [
        ['d', 'e'],
        ['e', 'b'],
        ['d', 'b']
      ]
    },
    'B_WhiteStroke_Outer': {
      stroke: '#fff',
      fill: '#00000000',
      strokeWidth: 10,
      points: [
        ['c', 'a'],
        ['c', 'b'],
        ['a', 'b']
      ]
    },
    'A': {
      morphTo: ['A', 'SkillsPolyA'],
      fill: Defaults.PolygonFill,
      stroke: '#fff',
      points: [
        ['d', 'e'],
        ['e', 'b'],
        ['d', 'b']
      ]
    },
    'B': {
      morphTo: ['B', 'SkillsPolyA'],
      fill: Defaults.PolygonFill,
      stroke: '#fff',
      points: [
        ['c', 'a'],
        ['c', 'b'],
        ['a', 'b']
      ]
    },
    'C': {
      morphTo: ['C', 'SkillsPolyA'],
      fill: '#00000000',
      stroke: '#fff',
      points: [
        ['h', 'f'],
        ['h', 'g'],
        ['f', 'g']
      ]
    },
    'D': {
      morphTo: ['D', 'SkillsPolyA'],
      fill: '#00000000',
      stroke: '#fff',
      points: [
        ['j', 'k'],
        ['k', 'i'],
        ['j', 'i']
      ]
    },
    'LeftTriangleA': {
      morphTo: ['PinkTriangleBackground'],
      fill: '#fff',
      stroke: Defaults.DefaultStroke,
      strokeWidth: 15,
      points: [
        ['ff', 'gg'],
        ['ff', 'b'],
        ['gg', 'b']
      ]
    },
    'RightTriangleA': {
      morphTo: ['PinkTriangle'],
      fill: '#fff',
      stroke: Defaults.DefaultStroke,
      strokeWidth: 15,
      points: [
        ['bb', 'dd'],
        ['bb', 'ee'],
        ['ee', 'dd']
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
    'story-name-display': {
      type: 'intersections',
      intersections: [
        ['e', 'a'],
        ['e', 'b']
      ]
    },
    'selected-year-display': {
      type: 'intersections',
      copyDeg: 'b',
      intersections: [
        ['b', 'c']
      ]
    },
    'year-selection': {
      type: 'intersections',
      copyDeg: 'b',
      intersections: [
        ['b', 'c']
      ]
    },
    'story-info-display': {
      type: 'intersections',
      intersections: [
        ['bb', 'ee']
      ]
    },
    'articles-container': {
      type: 'intersections',
      intersections: [
        ['bb', 'ee']
      ]
    },
    'story-page-name-display': {
      type: 'intersections',
      intersections: [
        ['blc0', 'blc1']
      ]
    }
  }
}

export default VariantModel
