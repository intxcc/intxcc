'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { keys, values } from 'mobx'

import autobind from 'autobind-decorator'

import Defaults from '../config/defaults'

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

const Guides = observer((props) => {
  if (!Defaults.showGuides) {
    return ''
  }

  return (
    values(props.guides).filter(guide => !guide.hide).map((guide, key) => (
      <Guide
        key={props.classNameStart + props.guideKeys[key]}
        from={guide.from}
        to={guide.to} />
    ))
  )
})

Guides.propTypes = {
  classNameStart: PropTypes.string,
  guideKeys: PropTypes.array,
  guides: PropTypes.object
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

const Polygons = observer((props) => (
  values(props.polygons).map((polygon, key) => (
    <Polygon
      key={props.classNameStart + props.polygonKeys[key]}
      fill={polygon.fill}
      stroke={polygon.stroke}
      strokeWidth={props.strokeWidth}
      path={polygon.path} />
  ))
))

Polygons.propTypes = {
  classNameStart: PropTypes.string,
  strokeWidth: PropTypes.number,
  polygonKeys: PropTypes.array,
  polygons: PropTypes.object
}

@observer
class View extends React.Component {
  constructor (props) {
    super(props)

    // Save model to catch model changes
    this.model = ''

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

    if (this.props.global.clientWidth === this.dimensions.width && this.props.global.clientHeight === this.dimensions.height && this.props.view.initialized) {
      return
    }

    this.dimensions.width = this.props.global.clientWidth
    this.dimensions.height = this.props.global.clientHeight

    // Load the guides in the view entity
    for (let index in this.helperDivs) {
      // TODO For some reason the helper divs are still in the helperDivs object, even after clearing
      if (!this.helperDivs[index]) {
        continue
      }

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

    // Catch model update
    if (this.model !== props.view.model) {
      this.updateTimeout = false

      for (var member in this.helperDivs) {
        delete this.helperDivs[member]
      }
    } else {
      props.view.wasInitialized()
    }
    this.model = props.view.model

    if (this.updateTimeout === false) {
      // Set the update of the helper divs at the end of the javascript event loop queue
      this.updateTimeout = setTimeout(this.updateHelperDivs, 0)
    }

    return (
      <div className={props.className + ' view-wrapper view-' + props.view.model}>
        <div className={'view-model'}>
          {/* The view model (how the bg of the startpage looks) is shown here. That should be a svg object with guide lines, guide divs and polygons. */}
          <SvgObject className='svg-wrapper' viewBox={props.global.svgViewBox}>
            <Guides
              classNameStart={props.className + '-' + props.view.model + '-guide-'}
              guideKeys={guideKeys}
              guides={props.view.guides} />
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
            className='content-wrapper-outer'
            ref={ (contentWrapperOuter) => { this.contentWrapperOuter = contentWrapperOuter }}>
            {this.props.loadedView}
          </div>
        </div>
        <div className={'view-model view-model-overlay'}>
          <SvgObject className='svg-wrapper' viewBox={props.global.svgViewBox}>
            <Polygons
              classNameStart={props.className + '-' + props.view.model + '-polygon-'}
              strokeWidth={this.props.global.strokeWidth}
              polygonKeys={polygonKeys}
              polygons={props.view.polygons} />
          </SvgObject>
        </div>
        <div className='overlay-wrapper-outer'>
          {this.props.loadedOverlayView}
        </div>
      </div>
    )
  }
}

View.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object,
  viewModel: PropTypes.object,
  className: PropTypes.string,
  loadedView: PropTypes.object,
  loadedOverlayView: PropTypes.object
}

export default View
