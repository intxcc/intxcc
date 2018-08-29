'use strict'

import React from 'react'

import { Spring, animated } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons'
import { interpolate } from 'flubber'

import autobind from 'autobind-decorator'

const paths = [
  [
    {
      'fill': '#1a1a1a',
      'path': 'm212.75 31.767 12.294-26.364-52.116 11.078z'
    }, {
      'fill': '#1a1a1a',
      'path': 'm81.592 48.472 27.402 15.189 89.262-45.481z'
    }, {
      'fill': '#1a1a1a',
      'path': 'm196.85 133.25-95.25-27.186 111.15-53.115z'
    }
  ], [
    {
      'fill': '#1a1a1a',
      'path': 'm204.97 48.464 5.645-12.106-19.312-7.4127z'
    }, {
      'fill': '#1a1a1a',
      'path': 'm63.852 53.072 31.568 17.498-31.551 16.076z'
    }, {
      'fill': '#fff',
      'stroke': '#1a1a1a',
      'path': 'm88.867 45.012 8.792 32.279 45.745-53.446z'
    }
  ], [
    {
      'stroke': '#fff',
      'path': 'm212.16 30.122 10.686-22.916-45.299 9.629z'
    }, {
      'stroke': '#fff',
      'stroke-miterlimit': '11',
      'path': 'm85.238 48.872 23.844 13.217 77.673-39.576z'
    }, {
      'stroke': '#fff',
      'path': 'm194.81 129.67-84.779-24.198 98.932-47.276z'
    }
  ], [
    {
      'stroke': '#fff',
      'path': 'm204.83 46.214 4.3016-9.2248-14.716-5.6485z'
    }, {
      'stroke': '#fff',
      'path': 'm65.425 55.772 26.529 14.705-26.515 13.51z'
    }, {
      'stroke': '#1a1a1a',
      'path': 'm88.867 90.732 8.2714 5.5031-8.2714-30.618z'
    }
  ]
]

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0
    }

    this.dontAnimate = true
    this.morphing = false
  }

  @autobind
  goNext () {
    let newIndex = this.state.index + 1

    if (newIndex >= paths[0].length) {
      newIndex = 0
    }

    this.morphing = true

    if (this.dontAnimate) {
      newIndex = this.state.index
      this.dontAnimate = false
    }

    this.setState({
      index: newIndex
    })
  }

  @autobind
  beginMorphing () {
    if (this.morphing === true) {
      return
    }

    this.goNext()
  }

  @autobind
  endMorphing () {
    this.morphing = false
  }

  @autobind
  render () {
    const index = this.state.index

    let interpolators = []
    for (let path of paths) {
      let path2 = index + 1
      if (path2 >= paths[0].length) {
        path2 = 0
      }

      let path1 = path[index]
      path2 = path[path2]

      if (this.dontAnimate) {
        path2 = path1
      }

      interpolators.push(
        {
          'interpolator': interpolate(path1['path'], path2['path'], { maxSegmentLength: 1 }),
          'fill1': path1['fill'] || 'rgba(255,255,255,0)',
          'stroke1': path1['stroke'] || 'rgba(255,255,255,0)',
          'strokeWidth1': path1['stroke-width'] || 0.4,
          'strokeMiterlimit1': path1['stroke-miterlimit'] || 4,
          'fill2': path2['fill'] || 'rgba(255,255,255,0)',
          'stroke2': path2['stroke'] || 'rgba(255,255,255,0)',
          'strokeWidth2': path2['stroke-width'] || 0.4,
          'strokeMiterlimit2': path2['stroke-miterlimit'] || 4
        }
      )
    }

    return (
      <div id='main-wrapper'>
        <svg width='100%' viewBox="0 0 232.27 138.68" onClick={this.beginMorphing}>
          {interpolators.map((interpolator, i) => (
            <Spring key={'interpolator_' + i} reset native
              from={{
                t: 0,
                fill: interpolator['fill1'],
                stroke: interpolator['stroke1']
              }} to={{
                t: 1,
                fill: interpolator['fill2'],
                stroke: interpolator['stroke2']
              }} onRest={this.endMorphing} impl={TimingAnimation} config={{ duration: 400, easing: Easing.ease }}>
              {({ t, fill, stroke }) => {
                console.log(stroke)

                return (
                  <animated.path
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={interpolator['strokeWidth2']}
                    strokeMiterlimit={interpolator['strokeMiterlimit2']}
                    d={t.interpolate(interpolator['interpolator'])} />
                )
              }}
            </Spring>
          ))}
        </svg>
      </div>
    )
  }
}

export default App
