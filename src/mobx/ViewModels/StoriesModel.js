// This is the ViewModel of the stories view

import Defaults from '../../config/defaults'

const ViewModel = {
  name: 'stories',
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
      move: 10
    },
    'g': {
      type: 'copy',
      hide: true,
      reverse: true,
      copy: 'b',
      move: 10
    },
    'h': {
      type: 'copy',
      hide: true,
      copy: 'c',
      move: 10
    },
    // //////// //
    'i': {
      type: 'copy',
      hide: true,
      reverse: true,
      copy: 'b',
      move: 10
    },
    'j': {
      type: 'copy',
      hide: true,
      reverse: true,
      copy: 'd',
      move: 10
    },
    'k': {
      type: 'copy',
      hide: true,
      copy: 'e',
      move: 10
    }
  },
  polygons: {
    'A': {
      points: [
        ['d', 'e'],
        ['e', 'b'],
        ['d', 'b']
      ]
    },
    'B': {
      points: [
        ['c', 'a'],
        ['c', 'b'],
        ['a', 'b']
      ]
    },
    'C': {
      fill: 'none',
      stroke: '#fff',
      points: [
        ['h', 'f'],
        ['h', 'g'],
        ['f', 'g']
      ]
    },
    'D': {
      fill: 'none',
      stroke: '#fff',
      points: [
        ['j', 'k'],
        ['k', 'i'],
        ['j', 'i']
      ]
    },
    'E': {
      fill: 'none',
      stroke: Defaults.DefaultStroke,
      points: [
        ['bb', 'dd'],
        ['bb', 'ee'],
        ['ee', 'dd']
      ]
    },
    'F': {
      fill: 'none',
      stroke: Defaults.DefaultStroke,
      points: [
        ['ff', 'gg'],
        ['ff', 'b'],
        ['gg', 'b']
      ]
    }
  }
}

export default ViewModel