'use strict'

const HelperLines = [
  {
    name: 'a',
    class: 'stories-helper-a',
    deg: -14.556
  }, {
    name: 'b',
    class: 'stories-helper-b',
    deg: -27.000
  }, {
    name: 'c',
    class: 'stories-helper-c',
    deg: -151
  }, {
    name: 'd',
    class: 'stories-helper-d',
    deg: -151
  }, {
    name: 'e',
    deg: -90,
    intersect: {
      line1: 'a',
      line2: 'd'
    }
  }, {
    name: 'f',
    copy: 'd',
    move: 10,
    reverse: true
  }, {
    name: 'g',
    copy: 'e',
    move: 10
  }, {
    name: 'h',
    copy: 'b',
    move: 10,
    reverse: true
  }
]

const Polygons = [
  {
    name: 'A',
    intersections: [
      ['d', 'e'],
      ['e', 'b'],
      ['d', 'b']
    ]
  }, {
    name: 'B',
    intersections: [
      ['c', 'a'],
      ['c', 'b'],
      ['a', 'b']
    ]
  }, {
    name: 'C',
    fill: '#fff',
    intersections: [
      ['f', 'g'],
      ['f', 'h'],
      ['g', 'h']
    ]
  }
]

const Strokes = [
  {
    name: 'A_',
    margin: 10,
    intersections: [
      ['d', 'e'],
      ['e', 'b'],
      ['d', 'b']
    ]
  }
]

const StoriesLayout = {
  HelperLines: HelperLines,
  Polygons: Polygons,
  Strokes: Strokes
}

export default StoriesLayout
