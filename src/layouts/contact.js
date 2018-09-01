'use strict'

const HelperLines = [
  {
    name: 'a',
    class: 'contact-helper-a',
    deg: -26.000
  }, {
    name: 'b',
    class: 'contact-helper-b',
    deg: -80.000
  }, {
    name: 'c',
    class: 'contact-helper-c',
    deg: -164
  }, {
    name: 'd',
    class: 'contact-helper-d',
    deg: -159
  }, {
    name: 'e',
    deg: -125,
    class: 'contact-helper-e'
  }, {
    name: 'f',
    copy: 'c',
    move: 10
  }, {
    name: 'g',
    copy: 'a',
    move: 10
  }, {
    name: 'h',
    copy: 'b',
    reverse: true,
    move: 10
  }
]

const Polygons = [
  {
    name: 'A',
    intersections: [
      ['c', 'a'],
      ['c', 'b'],
      ['a', 'b']
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

const ContactLayout = {
  HelperLines: HelperLines,
  Polygons: Polygons,
  Strokes: Strokes
}

export default ContactLayout
