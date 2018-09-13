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

    // If stroke width of the polygon is set to a number smaller than 0 we use the default stroke width
    let pStrokeWidth = polygon.strokeWidth
    if (pStrokeWidth < 0) {
      pStrokeWidth = props.strokeWidth
    }

    if (props.morphTo) {
      let morphToPolygon = [props.morphTo.get(key)]

      // Find out which polygons want to get morphed from this one and create a Morph object for them
      if (polygon.morphFrom && polygon.morphFrom.length > 0) {
        morphToPolygon = []
        for (let morphFrom of polygon.morphFrom) {
          morphToPolygon.push(
            props.morphTo.get(morphFrom)
          )
        }
      }

      // MARKER_001
      // If no polygon is found from which one this shall be morphed, we choose a random one
      // Attention: This is buggy, because it gets rendered 2 times, fix or just manually select a polygon to morph from in the specific View Models
      // if (!morphToPolygon[0]) {
      //   console.log('1')
      //   const morphToKeys = keys(props.morphTo)
      //   const randomKeyIndex = Math.floor((Math.random() * morphToKeys.length))
      //   const randomKey = morphToKeys[randomKeyIndex]
      //   morphToPolygon = [props.morphTo.get(randomKey)]
      // }

      if (morphToPolygon[0]) {
        if (morphToPolygon.length === 1) {
          morphToPolygon = morphToPolygon[0]

          // If stroke width of the morphToPolygon is set to a number smaller than 0 we use the default stroke width
          let mStrokeWidth = morphToPolygon.strokeWidth
          if (mStrokeWidth < 0) {
            mStrokeWidth = props.strokeWidth
          }

          return (
            <PolygonMorph
              key={props.classNameStart + key}
              fill1={polygon.fill}
              stroke1={polygon.stroke}
              strokeWidth1={pStrokeWidth}
              path1={polygon.path}
              fill2={morphToPolygon.fill}
              stroke2={morphToPolygon.stroke}
              strokeWidth2={mStrokeWidth}
              path2={morphToPolygon.path} />
          )
        } else {
          // If there is more than one polygon, that wants to be morphed from this, every one gets its own copy

          let polygonMorphes = []
          for (let morphToIndex in morphToPolygon) {
            const morphTo = morphToPolygon[morphToIndex]

            // If stroke width of the morphToPolygon is set to a number smaller than 0 we use the default stroke width
            let mStrokeWidth = morphTo.strokeWidth
            if (mStrokeWidth < 0) {
              mStrokeWidth = props.strokeWidth
            }

            polygonMorphes.push(
              <PolygonMorph
                key={props.classNameStart + key + '-' + morphToIndex}
                fill1={polygon.fill}
                stroke1={polygon.stroke}
                strokeWidth1={pStrokeWidth}
                path1={polygon.path}
                fill2={morphTo.fill}
                stroke2={morphTo.stroke}
                strokeWidth2={mStrokeWidth}
                path2={morphTo.path} />
            )
          }

          return polygonMorphes
        }
      }
    }

    return (
      <Polygon
        key={props.classNameStart + key}
        fill={polygon.fill}
        stroke={polygon.stroke}
        strokeWidth={pStrokeWidth}
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
