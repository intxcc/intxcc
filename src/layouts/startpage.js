'use strict'

const HelperLines = [
  {
    name: 'a',
    class: 'startpage-helper-a',
    deg: -12.000
  }, {
    name: 'b',
    class: 'startpage-helper-b',
    deg: -65.000
  }, {
    name: 'c',
    class: 'startpage-helper-c',
    deg: -159
  }, {
    name: 'd',
    class: 'startpage-helper-d',
    deg: -159
  }, {
    name: 'e',
    deg: -125,
    class: 'startpage-helper-e'
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

const StartpageLayout = {
  HelperLines: HelperLines,
  Polygons: Polygons,
  Strokes: Strokes
}

export default StartpageLayout
