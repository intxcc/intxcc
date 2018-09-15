'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { values } from 'mobx'

import { Spring, animated } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons'

import Defaults from '../../config/defaults'

import Style from '../../../style/variables/global.scss'

const Guide = observer((props) => (
  <path
    d={`M ${props.from.x},${props.from.y} ${props.to.x},${props.to.y} Z`}
    stroke={Defaults.guideStroke} strokeWidth='1' />
))

Guide.propTypes = {
  from: PropTypes.object,
  to: PropTypes.object
}

const GuideMorph = observer((props) => (
  <Spring reset native
    from={{
      t: `M ${props.from1.x},${props.from1.y} ${props.to1.x},${props.to1.y} Z`
    }} to={{
      t: `M ${props.from2.x},${props.from2.y} ${props.to2.x},${props.to2.y} Z`
    }} impl={TimingAnimation} config={{ duration: Style.morphDuration, easing: Easing.ease }}>
    {({ t }) => {
      return (
        <animated.path
          strokeWidth='1'
          stroke={Defaults.guideStroke}
          d={t} />
      )
    }}
  </Spring>
))

GuideMorph.propTypes = {
  from1: PropTypes.object,
  to1: PropTypes.object,
  from2: PropTypes.object,
  to2: PropTypes.object
}

const GuidesComponent = observer((props) => {
  if (!Defaults.showGuides) {
    return ''
  }

  return (
    values(props.guides).map((guide, key) => {
      if (guide.hide) {
        return
      }

      key = props.guideKeys[key]

      if (props.morphTo) {
        const morphToGuide = props.morphTo.get(key)

        if (morphToGuide) {
          return (
            <GuideMorph
              key={props.classNameStart + key}
              from1={guide.from}
              to1={guide.to}
              from2={morphToGuide.from}
              to2={morphToGuide.to} />
          )
        }
      }

      return (
        <Guide
          key={props.classNameStart + key}
          from={guide.from}
          to={guide.to} />
      )
    })
  )
})

GuidesComponent.propTypes = {
  classNameStart: PropTypes.string,
  guideKeys: PropTypes.array,
  guides: PropTypes.object,
  morphTo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
}

export default GuidesComponent
