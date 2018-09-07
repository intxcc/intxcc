// This is the ViewModel of the startpage

const ViewModel = {
  name: 'startpage',
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
    'd': {
      deg: -159,
      vpos: 'top',
      hpos: 'right'
    },
    'e': {
      deg: -125,
      vpos: 'top',
      hpos: 'right'
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
    }
  }
}

export default ViewModel
