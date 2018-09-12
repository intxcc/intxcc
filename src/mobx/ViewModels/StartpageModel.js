import Colors from '../../../style/variables/colors.scss'

// This is the ViewModel of the startpage

const ViewModel = {
  name: 'startpage',
  logoClassName: 'logo-big',
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
    'PinkTriangleBackground': {
      morphFrom: ['LeftTriangleA'],
      fill: '#fff',
      stroke: '#fff',
      points: [
        ['w1', 'w2'],
        ['w1', 'w3'],
        ['w2', 'w3']
      ]
    },
    'PinkTriangle': {
      morphFrom: ['RightTriangleA', 'PinkTriangle'],
      fill: '#fff',
      stroke: Colors.primaryColor,
      points: [
        ['p1', 'p2'],
        ['p1', 'p3'],
        ['p2', 'p3']
      ]
    }
  }
}

export default ViewModel
