// This is the ViewModel of the stories view

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
    }
  }
}

export default ViewModel
