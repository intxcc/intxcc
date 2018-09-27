'use strict'

import Colors from '../../../../../style/variables/colors.scss'
import Defaults from '../../../../config/defaults'

// This is the ViewModel of the stories view

const VariantModel = {
  logoClassName: 'logo-big',
  logoTransparent: true,
  guides: {
    'a': {
      deg: -12,
      vpos: 'top',
      hpos: 'right'
    },
    'b': {
      deg: -65,
      vpos: 'top',
      hpos: 'right'
    },
    'c': {
      deg: -159,
      vpos: 'top',
      hpos: 'right'
    },
    // //////// //
    'd': {
      deg: -159,
      vpos: 'top',
      hpos: 'right'
    },
    'e': {
      deg: -125,
      vpos: 'top',
      hpos: 'right'
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
      vpos: 'top',
      hpos: 'right'
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
    }
  },
  polygons: {
    'A': {
      morphTo: ['A', 'SkillsPolyA', 'AboutPinkTriangle'],
      fill: Defaults.PolygonFill,
      stroke: Defaults.White,
      points: [
        ['d', 'e'],
        ['e', 'b'],
        ['d', 'b']
      ]
    },
    'B': {
      morphTo: ['B', 'SkillsPolyA', 'AboutPinkTriangleBackground'],
      fill: Defaults.PolygonFill,
      stroke: Defaults.White,
      points: [
        ['c', 'a'],
        ['c', 'b'],
        ['a', 'b']
      ]
    },
    'C': {
      morphTo: ['C', 'SkillsPolyA', 'AboutPinkTriangle'],
      fill: '#00000000',
      stroke: Defaults.White,
      points: [
        ['h', 'f'],
        ['h', 'g'],
        ['f', 'g']
      ]
    },
    'D': {
      morphTo: ['D', 'SkillsPolyA', 'AboutPinkTriangleBackground'],
      fill: '#00000000',
      stroke: Defaults.White,
      points: [
        ['j', 'k'],
        ['k', 'i'],
        ['j', 'i']
      ]
    },
    'PinkTriangleBackground': {
      morphTo: ['LeftTriangleA', 'AboutPinkTriangleBackground', 'D'],
      fill: Defaults.White,
      stroke: Defaults.White,
      points: [
        ['w1', 'w2'],
        ['w1', 'w3'],
        ['w2', 'w3']
      ]
    },
    'PinkTriangle': {
      morphTo: ['PinkTriangle', 'AboutPinkTriangle', 'RightTriangleA'],
      fill: Defaults.White,
      stroke: Colors.primaryColor,
      points: [
        ['p1', 'p2'],
        ['p1', 'p3'],
        ['p2', 'p3']
      ]
    }
  }
}

export default VariantModel
