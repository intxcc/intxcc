'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { keys, values } from 'mobx'

import autobind from 'autobind-decorator'

const SvgObject = observer((props) => (
  <svg className={props.className} viewBox={props.viewBox}>
    {props.children}
  </svg>
))

SvgObject.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  viewBox: PropTypes.string
}

const Guide = observer((props) => (
  <path
    d={`M ${props.from.x},${props.from.y} ${props.to.x},${props.to.y} Z`}
    stroke='#999' strokeWidth='0.2' />
))

Guide.propTypes = {
  from: PropTypes.object,
  to: PropTypes.object
}

const Guides = observer((props) => (
  values(props.guides).filter(guide => !guide.hide).map((guide, key) => (
    <Guide
      key={props.classNameStart + props.guideKeys[key]}
      from={guide.from}
      to={guide.to} />
  ))
))

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

      rect = this.viewContent.getBoundingClientRect()
      this.props.global.setViewContentRect(rect)
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

    setTimeout(this.viewContentScroll, 0)
  }

  @autobind
  render () {
    const props = this.props
    const guideKeys = keys(props.viewModel.guides)
    const polygonKeys = keys(props.viewModel.polygons)

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
          {keys(props.viewModel.guides).map((key) => (
            <div
              ref={ (helperDiv) => { this.helperDivs[key] = helperDiv }}
              key={props.className + '-' + props.view.model + '-helper-div-' + key}
              className={'guide guide-' + key}>
            </div>
          ))}
        </div>
        <div
          className={'view-content'}
          ref={ (viewContent) => { this.viewContent = viewContent }}
          onScroll={this.viewContentScroll}>
          {/* The actual content of the view entity (the text on the startpage, search fields, interactive stuff, etc.) active in this view  */}
          <div
            className='content-wrapper-outer'
            ref={ (contentWrapperOuter) => { this.contentWrapperOuter = contentWrapperOuter }}>
            {this.props.children}
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
      </div>
    )
  }
}

View.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object,
  viewModel: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.object
}

export default View
