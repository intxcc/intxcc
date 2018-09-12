'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { keys, values } from 'mobx'

import autobind from 'autobind-decorator'

import Logo from '../logo/Logo'
import SvgObjectComponent from './Components/SvgObjectComponent'
import HelperDivsComponent from './Components/HelperDivsCompontent'
import GuidesComponent from './Components/GuidesComponent'
import PolygonsComponent from './Components/PolygonsComponent'

import Defaults from '../config/defaults'

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

    let Guides
    if (Defaults.showGuides) {
      Guides = (
        <SvgObjectComponent className='svg-wrapper' viewBox={props.global.svgViewBox}>
          <GuidesComponent
            classNameStart={props.className + '-' + props.view.model + '-guide-'}
            guideKeys={guideKeys}
            guides={props.view.guides}
            morphTo={props.buffer ? props.buffer.guides : false} />
        </SvgObjectComponent>
      )
    }

    return (
      <div className={viewFadeClassName + ' ' + props.className + ' view-wrapper view-' + props.view.model}>
        <div className={'view-model'}>
          {/* The view model (how the bg of the startpage looks) is shown here. That should be a svg object with guide lines and guide divs. The polygons are a overlay and go to */}
          {/* Render guide lines */}
          {Guides}
          {/* Render helper divs */}
          <HelperDivsComponent className={props.className} modelName={props.view.model} that={this} guides={props.viewModel.guides} />
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
          <SvgObjectComponent className='svg-wrapper' viewBox={props.global.svgViewBox}>
            <PolygonsComponent
              classNameStart={props.className + '-' + props.view.model + '-polygon-'}
              strokeWidth={this.props.global.strokeWidth}
              polygonKeys={polygonKeys}
              polygons={props.view.polygons}
              morphTo={props.buffer ? props.buffer.polygons : false} />
          </SvgObjectComponent>
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
