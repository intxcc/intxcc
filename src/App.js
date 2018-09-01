'use strict'

import React from 'react'

import { Spring, animated } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons'
import { interpolate } from 'flubber'

import autobind from 'autobind-decorator'

import Layouts from './layouts/index'

// Converts from degrees to radians.
Math.radians = function (degrees) {
  return degrees * Math.PI / 180
}

function lineIntersect (a, b) {
  a.m = (a[0].y - a[1].y) / (a[0].x - a[1].x) // slope of line 1
  b.m = (b[0].y - b[1].y) / (b[0].x - b[1].x) // slope of line 2

  if (a.m - b.m < Number.EPSILON) {
    let c = a
    a = b
    b = c
  }

  return a.m - b.m < Number.EPSILON ? undefined
    : {
      x: (a.m * a[0].x - b.m * b[0].x + b[0].y - a[0].y) / (a.m - b.m),
      y: (a.m * b.m * (b[0].x - a[0].x) + b.m * a[0].y - a.m * b[0].y) / (b.m - a.m)
    }
}

class App extends React.Component {
  constructor (props) {
    super(props)

    this.helperDivs = false
    this.helperLinesIndex = false

    // Use this variable to set the last state on initialization
    this.initialized = false

    this.state = {
      svgViewbox: '0 0 100 100',
      layout: 'Startpage'
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)

    this.updateDimensions()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  @autobind
  updateDimensions () {
    const siteWrapper = this.siteWrapper

    let newState = Object.assign({}, this.state)
    newState.svgViewbox = `0 0 ${siteWrapper.clientWidth} ${siteWrapper.clientHeight}`

    if (this.helperDivs === false) {
      newState = this.loadLayout(newState, newState.layout)
    }

    newState = this.drawHelperLines(newState)
    newState = this.drawPolygons(newState)

    if (this.helperDivs && this.initialized === false) {
      this.initialized = true

      // Initialisation doesn't have to be animated
      this.animate = false

      setTimeout(this.toStories, 20)
      setTimeout(this.toStartpage, 101)
    }

    this.setState(newState)
  }

  @autobind
  toStartpage () {
    this.toLayout('Startpage')
  }

  @autobind
  toStories () {
    this.toLayout('Stories')
  }

  @autobind
  toContact () {
    this.toLayout('Contact')
  }

  @autobind
  toLayout (layoutName) {
    // Waitr for animation to end
    if (this.animate) {
      return
    }

    let newState = Object.assign({}, this.state)
    newState = this.loadLayout(newState, layoutName)
    this.setState(newState)
  }

  @autobind
  stopAnimation () {
    this.animate = false
  }

  @autobind
  loadLayout (newState, layoutName) {
    newState.layoutName = layoutName
    newState.helperLines = Layouts[layoutName].HelperLines
    newState.polygons = Layouts[layoutName].Polygons

    this.animate = true

    newState.last = {}
    newState.last.layout = this.state.layout
    if (this.state.helperLines) {
      newState.last.helperLines = this.state.helperLines
    }

    if (this.state.polygons) {
      newState.last.polygons = this.state.polygons
    }

    // Index helper lines
    this.helperLinesIndex = {}
    this.helperDivs = false
    for (let index in newState.helperLines) {
      this.helperLinesIndex[newState.helperLines[index].name] = index
    }

    // Reload at end of js-event-loop
    setTimeout(this.updateDimensions, 0)

    return newState
  }

  @autobind
  drawPolygons (newState) {
    if (!this.helperDivs) {
      return newState
    }

    for (let index in newState.polygons) {
      let points = []
      for (let intersectionIndex in newState.polygons[index].intersections) {
        let intersection = newState.polygons[index].intersections[intersectionIndex]

        let line1 = newState.helperLines[this.helperLinesIndex[intersection[1]]]
        let line2 = newState.helperLines[this.helperLinesIndex[intersection[0]]]

        let intersectionPos = lineIntersect([
          line1.from,
          line1.to
        ], [
          line2.from,
          line2.to
        ])

        if (!intersectionPos) {
          return newState
        }

        points.push({
          x: intersectionPos.x,
          y: intersectionPos.y
        })
      }

      if (!newState.polygons[index].fill) {
        newState.polygons[index].fill = '#1a1a1a'
      }

      newState.polygons[index].points = points
    }

    return newState
  }

  @autobind
  drawHelperLines (newState) {
    if (!this.helperDivs) {
      return newState
    }

    for (let index in newState.helperLines) {
      let line = newState.helperLines[index]

      if (!line.stroke) {
        line.stroke = '#1a1a1a'
      }

      let pos
      if (line.copy) {
        pos = newState.helperLines[this.helperLinesIndex[line.copy]].pos
        line.deg = newState.helperLines[this.helperLinesIndex[line.copy]].deg

        if (line.reverse) {
          line.deg -= 180
        }

        let move = 0
        if (line.move) {
          move = line.move
        }

        pos.x += Math.cos(Math.radians(line.deg + 90)) * move
        pos.y += Math.sin(Math.radians(line.deg + 90)) * move
      } else {
        let div
        let divRect
        if (line.class) {
          div = this.helperDivs[line.name]

          divRect = div.getBoundingClientRect()
        }

        if (line.class) {
          pos = {
            x: divRect.right,
            y: divRect.y
          }
        } else if (line.intersect) {
          let line1 = newState.helperLines[this.helperLinesIndex[line.intersect.line1]]
          let line2 = newState.helperLines[this.helperLinesIndex[line.intersect.line2]]

          let intersection = lineIntersect([
            line1.from,
            line1.to
          ], [
            line2.from,
            line2.to
          ])

          if (!intersection) {
            return newState
          }

          pos = {
            x: intersection.x,
            y: intersection.y
          }
        } else {
          return
        }
      }

      let from = {
        x: pos.x - 2000 * Math.cos(Math.radians(line.deg)),
        y: pos.y - 2000 * Math.sin(Math.radians(line.deg))
      }

      let to = {
        x: pos.x + 2000 * Math.cos(Math.radians(line.deg)),
        y: pos.y + 2000 * Math.sin(Math.radians(line.deg))
      }

      newState.helperLines[index].from = from
      newState.helperLines[index].to = to
      newState.helperLines[index].pos = pos
    }

    return newState
  }

  @autobind
  render () {
    let helperDivs
    if (this.state.helperLines) {
      if (!this.helperDivs) {
        this.helperDivs = {}
      }

      helperDivs = this.state.helperLines.map((config, index) => {
        if (!config.class) {
          return
        }

        return (
          <div
            key={'helper-div-' + index + '-' + config.name}
            className={config.class}
            ref={ (helperDiv) => { this.helperDivs[config.name] = helperDiv }}>
          </div>
        )
      })
    }

    let helperLines
    if (this.state.helperLines) {
      helperLines = this.state.helperLines.map((config, index) => {
        if (!config.from) {
          return
        }

        if (this.animate && this.state.last && this.state.last.helperLines) {
          let lastConfig = this.state.last.helperLines[index]

          let dLast = `M ${lastConfig.from.x},${lastConfig.from.y} ${lastConfig.to.x},${lastConfig.to.y} Z`
          let d = `M ${config.from.x},${config.from.y} ${config.to.x},${config.to.y} Z`

          return (
            <Spring key={'polygon-spring-' + index + '-' + config.name} reset native
              from={{
                t: dLast
              }} to={{
                t: d
              }} impl={TimingAnimation} config={{ duration: 1000, easing: Easing.ease }}>
              {({ t }) => {
                return (
                  <animated.path
                    strokeWidth='0.1'
                    stroke={config.stroke}
                    d={t} />
                )
              }}
            </Spring>
          )
        } else {
          return (
            <path
              key={'helper-line-' + index + '-' + config.name}
              d={`M ${config.from.x},${config.from.y} ${config.to.x},${config.to.y} Z`}
              id={'helper-line-' + index + '-' + config.name}
              strokeWidth='0.1'
              stroke={config.stroke} />
          )
        }
      })
    }

    let polygons
    if (this.state.polygons) {
      polygons = this.state.polygons.map((polygon, index) => {
        if (!polygon.points) {
          return
        }

        let d = 'M '
        for (let point of polygon.points) {
          d += point.x + ',' + point.y + ' '
        }
        d += ' Z'

        if (this.animate && this.state.last && this.state.last.polygons) {
          let dLast = 'M '
          for (let point of this.state.last.polygons[index].points) {
            dLast += point.x + ',' + point.y + ' '
          }
          dLast += ' Z'

          let interpolator = interpolate(dLast, d, { maxSegmentLength: 6 })

          return (
            <Spring key={'polygon-spring-' + index + '-' + polygon.name} reset native
              from={{
                t: 0,
                tt: dLast
              }} to={{
                t: 1,
                tt: d
              }} impl={TimingAnimation} onRest={this.stopAnimation} config={{ duration: 1000, easing: Easing.ease }}>
              {({ t, tt }) => {
                return (
                  <animated.path
                    fill={polygon.fill}
                    d={t.interpolate(interpolator)} />
                )
              }}
            </Spring>
          )
        } else {
          return (
            <path
              key={'polygon-' + index + '-' + polygon.name}
              d={d}
              id={'polygon-' + index + '-' + polygon.name}
              fill={polygon.fill} />
          )
        }
      })
    }
    console.log('Rendered.')

    return (
      <div
        className='site-wrapper'
        ref={ (siteWrapper) => { this.siteWrapper = siteWrapper }} >
        <svg className='svg-wrapper' viewBox={this.state.svgViewbox} onClick={this.beginMorphing}>
          {polygons}
          {helperLines}
        </svg>
        {helperDivs}
        <div className='change-btn-wrapper'>
          <div className='change-btn' onClick={this.toStartpage}>
            Startpage
          </div>
          <div className='change-btn' onClick={this.toStories}>
            Stories
          </div>
          <div className='change-btn' onClick={this.toContact}>
            Contact
          </div>
        </div>
      </div>
    )
  }
}

export default App
