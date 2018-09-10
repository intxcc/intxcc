'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { keys, values } from 'mobx'

import { Spring, animated } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons'
import { interpolate } from 'flubber'

import autobind from 'autobind-decorator'

import Logo from '../logo/Logo'

import Defaults from '../config/defaults'

import Style from '../../style/variables/global.scss'

const HelperDivs = observer((props) => {
  return keys(props.guides).map((key) => (
    <div
      ref={ (helperDiv) => { props.that.helperDivs[key] = helperDiv }}
      key={props.className + '-' + props.modelName + '-helper-div-' + key}
      className={'guide guide-' + key}>
    </div>
  ))
})

HelperDivs.propTypes = {
  modelName: PropTypes.string,
  className: PropTypes.string,
  guides: PropTypes.object,
  that: PropTypes.object
}

const SvgObject = observer((props) => (
  <svg className={props.className} viewBox={props.viewBox}>
    {props.children}
  </svg>
))

SvgObject.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  className: PropTypes.string,
  viewBox: PropTypes.string
}

const Guide = observer((props) => (
  <path
    d={`M ${props.from.x},${props.from.y} ${props.to.x},${props.to.y} Z`}
    stroke='#eee' strokeWidth='1' />
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
          stroke='#eee'
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

const Guides = observer((props) => {
  if (!Defaults.showGuides) {
    return ''
  }

  return (
    values(props.guides).filter(guide => !guide.hide).map((guide, key) => {
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

Guides.propTypes = {
  classNameStart: PropTypes.string,
  guideKeys: PropTypes.array,
  guides: PropTypes.object,
  morphTo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
}

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

const Polygons = observer((props) => (
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

Polygons.propTypes = {
  classNameStart: PropTypes.string,
  strokeWidth: PropTypes.number,
  polygonKeys: PropTypes.array,
  polygons: PropTypes.object,
  morphTo: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
}

@observer
class View extends React.Component {
  constructor (props) {
    super(props)

    // Save reference to helper divs here
    this.helperDivs = {}

    // Dimensions of the global object are saved here, so we only update the helper divs if it is really necessary
    this.dimensions = {
      width: 0,
      height: 0
    }

    // Set timeout before updating teh helper divs, to prevent changing the state while the render method is running
    this.updateTimeout = false
  }

  componentDidMount () {
    this.updateHelperDivs()
  }

  @autobind
  viewContentScroll () {
    if (this.viewContent) {
      let rect = this.contentWrapperOuter.getBoundingClientRect()
      this.props.global.setContentWrapperRect(rect)
    }
  }

  @autobind
  updateHelperDivs () {
    this.updateTimeout = false

    if (this.props.global.clientWidth === this.dimensions.width && this.props.global.clientHeight === this.dimensions.height) {
      return
    }

    this.dimensions.width = this.props.global.clientWidth
    this.dimensions.height = this.props.global.clientHeight

    // Load the guides in the view entity
    for (let index in this.helperDivs) {
      const div = this.helperDivs[index]
      const rect = div.getBoundingClientRect()

      let y = rect.top
      if (this.props.viewModel.guides.get(index).vpos === 'bottom') {
        y = rect.bottom
      }

      let x = rect.left
      if (this.props.viewModel.guides.get(index).hpos === 'right') {
        x = rect.right
      }

      // MARKER_1 Insert additional guide properties here
      this.props.view.setGuide({
        name: index,
        hide: this.props.viewModel.guides.get(index).hide,
        intersect: values(this.props.viewModel.guides.get(index).intersect),
        reverse: this.props.viewModel.guides.get(index).reverse,
        copy: this.props.viewModel.guides.get(index).copy,
        move: this.props.viewModel.guides.get(index).move,
        type: this.props.viewModel.guides.get(index).type,
        deg: this.props.viewModel.guides.get(index).deg,
        pos: {
          x: x,
          y: y
        }
      })
    }

    // Load the polygons in the view entity
    for (let index of keys(this.props.viewModel.polygons)) {
      const polygon = this.props.viewModel.polygons.get(index)

      let points = []
      for (let point of polygon.points) {
        points.push(values(point))
      }

      this.props.view.setPolygon({
        name: index,
        stroke: polygon.stroke,
        fill: polygon.fill,
        points: points
      })
    }

    // Load the objects in the view entity
    for (let index of keys(this.props.viewModel.objects)) {
      const object = this.props.viewModel.objects.get(index)

      this.props.view.setObject({
        name: index,
        type: object.type,
        intersections: object.intersections
      })
    }

    setTimeout(this.viewContentScroll, 0)
  }

  @autobind
  render () {
    const props = this.props
    const guideKeys = keys(props.viewModel.guides)
    const polygonKeys = keys(props.viewModel.polygons)

    let fadeClassName = ''
    let viewFadeClassName = ''
    switch (props.view.transitionState) {
      case 'fadeOut':
      case 'morphing':
      case 'fadeInBuffer':
        fadeClassName = 'fade-out-content'
        break
      case 'fadeIn':
        viewFadeClassName = 'fade-in-content'
        break
    }

    if (this.updateTimeout === false) {
      // Set the update of the helper divs at the end of the javascript event loop queue
      this.updateTimeout = setTimeout(this.updateHelperDivs, 0)
    }

    return (
      <div className={viewFadeClassName + ' ' + props.className + ' view-wrapper view-' + props.view.model}>
        <div className={'view-model'}>
          {/* The view model (how the bg of the startpage looks) is shown here. That should be a svg object with guide lines, guide divs and polygons. */}
          <SvgObject className='svg-wrapper' viewBox={props.global.svgViewBox}>
            <Guides
              classNameStart={props.className + '-' + props.view.model + '-guide-'}
              guideKeys={guideKeys}
              guides={props.view.guides}
              morphTo={props.buffer ? props.buffer.guides : false} />
          </SvgObject>
          {/* Render helper divs */}
          <HelperDivs className={props.className} modelName={props.view.model} that={this} guides={props.viewModel.guides} />
        </div>
        <div
          className={'view-content'}
          ref={ (viewContent) => { this.viewContent = viewContent }}
          onScroll={this.viewContentScroll}>
          {/* The actual content of the view entity (the text on the startpage, search fields, interactive stuff, etc.) active in this view  */}
          <div
            className={'content-wrapper-outer ' + fadeClassName}
            ref={ (contentWrapperOuter) => { this.contentWrapperOuter = contentWrapperOuter }}>
            <Logo className={props.viewModel.logoClassName} />
            {this.props.loadedView}
          </div>
        </div>
        <div className={'view-model view-model-overlay'}>
          <SvgObject className='svg-wrapper' viewBox={props.global.svgViewBox}>
            <Polygons
              classNameStart={props.className + '-' + props.view.model + '-polygon-'}
              strokeWidth={this.props.global.strokeWidth}
              polygonKeys={polygonKeys}
              polygons={props.view.polygons}
              morphTo={props.buffer ? props.buffer.polygons : false} />
          </SvgObject>
        </div>
        <div className={'overlay-wrapper-outer ' + fadeClassName}>
          {this.props.loadedOverlayView}
        </div>
      </div>
    )
  }
}

View.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object,
  buffer: PropTypes.object,
  viewModel: PropTypes.object,
  className: PropTypes.string,
  loadedView: PropTypes.object,
  loadedOverlayView: PropTypes.object
}

export default View
