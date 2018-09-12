'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { values } from 'mobx'

import { Spring, animated } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons'
import { interpolate } from 'flubber'

import Style from '../../../style/variables/global.scss'

const Polygon = observer((props) => (
  <path
    d={props.path}
    strokeWidth={props.strokeWidth + 'px'}
    strokeMiterlimit='20'
    stroke={props.stroke}
    fill={props.fill} />
))

Polygon.propTypes = {
  path: PropTypes.string,
  stroke: PropTypes.string,
  fill: PropTypes.string,
  strokeWidth: PropTypes.number
}

const PolygonMorph = observer((props) => {
  const interpolator = interpolate(props.path1, props.path2, { maxSegmentLength: 5 })

  return (
    <Spring reset native
      from={{
        t: 0,
        d: props.path1,
        stroke: props.stroke1,
        fill: props.fill1,
        strokeWidth: props.strokeWidth1
      }} to={{
        t: 1,
        d: props.path2,
        stroke: props.stroke2,
        fill: props.fill2,
        strokeWidth: props.strokeWidth2
      }} impl={TimingAnimation} config={{ duration: Style.morphDuration, easing: Easing.ease }}>
      {({ t, d, stroke, fill, strokeWidth }) => {
        return (
          <animated.path
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill={fill}
            d={t.interpolate(interpolator)} />
        )
      }}
    </Spring>
  )
})

PolygonMorph.propTypes = {
  path1: PropTypes.string,
  stroke1: PropTypes.string,
  fill1: PropTypes.string,
  strokeWidth1: PropTypes.number,
  path2: PropTypes.string,
  stroke2: PropTypes.string,
  fill2: PropTypes.string,
  strokeWidth2: PropTypes.number
}

const PolygonsComponent = observer((props) => (
  values(props.polygons).map((polygon, key) => {
    key = props.polygonKeys[key]

    if (props.morphTo) {
      const morphToPolygon = props.morphTo.get(key)

      if (morphToPolygon) {
        return (
          <PolygonMorph
            key={props.classNameStart + key}
            fill1={polygon.fill}
            stroke1={polygon.stroke}
            strokeWidth1={polygon.strokeWidth}
            path1={polygon.path}
            fill2={morphToPolygon.fill}
            stroke2={morphToPolygon.stroke}
            strokeWidth2={morphToPolygon.strokeWidth}
            path2={morphToPolygon.path} />
        )
      }
    }

    return (
      <Polygon
        key={props.classNameStart + key}
        fill={polygon.fill}
        stroke={polygon.stroke}
        strokeWidth={props.strokeWidth}
        path={polygon.path} />
    )
  })
))

PolygonsComponent.propTypes = {
  classNameStart: PropTypes.string,
  strokeWidth: PropTypes.number,
  polygonKeys: PropTypes.array,
  polygons: PropTypes.object,
  morphTo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
}

export default PolygonsComponent
