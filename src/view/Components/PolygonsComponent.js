'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { values } from 'mobx'

import { Spring, animated } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons'
import { interpolate } from 'flubber'

import Style from '../../../style/variables/global.scss'

import Defaults from '../../config/defaults'

const Polygon = observer((props) => (
  <path
    d={props.path}
    strokeWidth={props.strokeWidth + 'px'}
    strokeMiterlimit={Defaults.DefaultStrokeMiterlimit}
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
        stroke: props.stroke1,
        fill: props.fill1,
        strokeWidth: props.strokeWidth1
      }} to={{
        t: 1,
        stroke: props.stroke2,
        fill: props.fill2,
        strokeWidth: props.strokeWidth2
      }} impl={TimingAnimation} config={{ duration: props.morphDuration, easing: Easing.ease }}>
      {({ t, stroke, fill, strokeWidth }) => {
        return (
          <animated.path
            strokeWidth={strokeWidth}
            stroke={stroke}
            strokeMiterlimit={Defaults.DefaultStrokeMiterlimit}
            fill={fill}
            d={t.interpolate(interpolator)} />
        )
      }}
    </Spring>
  )
})

PolygonMorph.propTypes = {
  morphDuration: PropTypes.number,
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
      pStrokeWidth = Defaults.DefaultStrokeWidth * props.pixelScale
    } else {
      pStrokeWidth = pStrokeWidth * props.pixelScale
    }

    if (props.morphTo) {
      let morphToPolygon = [props.morphTo.get(key)]

      // Only when the current change is no variant change do we search for polygons that want to get transition from this, as it makes no sense and is buggy if done with variant changes
      if (!props.isVariantMorph) {
        // Find out which polygons want to get morphed from this one and create a Morph object for them
        if (polygon.morphTo && polygon.morphTo.length > 0) {
          morphToPolygon = []
          for (let morphTo of polygon.morphTo) {
            const getMorphTo = props.morphTo.get(morphTo)
            if (getMorphTo) {
              morphToPolygon.push(getMorphTo)
            }
          }
        }
      }

      if (morphToPolygon[0]) {
        // Every polygon, that wants to be morphed from this, gets its own copy

        let polygonMorphes = []
        for (let morphToIndex in morphToPolygon) {
          const morphTo = morphToPolygon[morphToIndex]

          // If stroke width of the morphToPolygon is set to a number smaller than 0 we use the default stroke width
          let mStrokeWidth = morphTo.strokeWidth
          if (mStrokeWidth < 0) {
            mStrokeWidth = Defaults.DefaultStrokeWidth * props.pixelScale
          } else {
            mStrokeWidth = mStrokeWidth * props.pixelScale
          }

          polygonMorphes.push(
            <PolygonMorph
              morphDuration={parseInt(props.isVariantMorph ? Style.variantMorphDuration : Style.morphDuration)}
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
  pixelScale: PropTypes.number,
  isVariantMorph: PropTypes.bool,
  polygonKeys: PropTypes.array,
  polygons: PropTypes.object,
  morphTo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
}

export default PolygonsComponent
