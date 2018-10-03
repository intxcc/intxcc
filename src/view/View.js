'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { keys, values } from 'mobx'

import autobind from 'autobind-decorator'

import { isEmpty } from '../miscFunctions'

import Logo from '../logo/Logo'
import SvgObjectComponent from './Components/SvgObjectComponent'
import HelperDivsComponent from './Components/HelperDivsCompontent'
import GuidesComponent from './Components/GuidesComponent'
import PolygonsComponent from './Components/PolygonsComponent'

import PopupWrapper from './Popup/PopupWrapper'

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
    // Give the basicInfo the reference of the view entity and the view entity the one of the basicInfo. Then load the modelVariant saved in the basicInfo of the state now loaded
    if (this.props.state && this.props.state.basicInfo) {
      this.props.state.basicInfo.setViewEntityReference(this.props.view.id)
      this.props.view.setStateBasicInfo(this.props.state.basicInfo.id)
      this.props.view.forceModelVariant(this.props.state.basicInfo.modelVariant)
    }

    this.updateHelperDivs()

    // Set scroll top after first render, append to event queue
    setTimeout(this.setScrollTop, 0)
  }

  @autobind
  setScrollTop () {
    if (this.viewContent) {
      if (this.props.state && this.props.state.onScroll) {
        this.viewContent.scrollTop = this.props.state.basicInfo.scrollTop
      }
    }
  }

  @autobind
  viewContentScroll () {
    if (this.viewContent) {
      // onScroll event is forwarded to the state if it has a onScroll event
      if (this.props.state && this.props.state.onScroll) {
        // If we are currently initializing scroll then don't update the state, as the state scroll gets set in the next step
        if (!this.initializeScroll) {
          this.props.state.onScroll(this.viewContent.scrollTop)
        }
      }

      this.initializeScroll = false
    }
  }

  @autobind
  updateHelperDivs () {
    this.updateTimeout = false

    // Check if the update is forces (e.g. on model variant change)
    if (!this.forceUpdateHelperDivs) {
      // If the update isn't forced we check if the dimension have changed
      if (this.props.global.clientWidth === this.dimensions.width && this.props.global.clientHeight === this.dimensions.height) {
        return
      }
    }
    this.forceUpdateHelperDivs = false

    this.dimensions.width = this.props.global.clientWidth
    this.dimensions.height = this.props.global.clientHeight

    if (this.props.state && this.props.state.basicInfo && this.props.state.basicInfo.setClientDimensions) {
      this.props.state.basicInfo.setClientDimensions(this.props.global.clientWidth, this.props.global.clientHeight)
    }

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

      let move = this.props.viewModel.guides.get(index).move
      if (move) {
        // Calculate client dimension dependent move length
        move = move * this.props.global.pixelScale
      }

      // MARKER_1 Insert additional guide properties here
      this.props.view.setGuide({
        name: index,
        hide: this.props.viewModel.guides.get(index).hide,
        intersect: values(this.props.viewModel.guides.get(index).intersect),
        reverse: this.props.viewModel.guides.get(index).reverse,
        copy: this.props.viewModel.guides.get(index).copy,
        move: move,
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
        morphTo: polygon.morphTo,
        strokeWidth: polygon.strokeWidth,
        stroke: polygon.stroke,
        fill: polygon.fill,
        points: points
      })
    }

    // Load the objects in the view entity
    for (let index of keys(this.props.viewModel.objects)) {
      const object = this.props.viewModel.objects.get(index)

      let deg = object.deg
      // If a the copyDeg attribute is set we copy the deg of the guide line with the name of copyDeg
      if (object.copyDeg !== '') {
        const copyGuideDeg = this.props.viewModel.guides.get(object.copyDeg)
        if (copyGuideDeg) {
          deg = copyGuideDeg.deg
        }
      }

      this.props.view.setObject({
        name: index,
        deg: deg,
        type: object.type,
        intersections: object.intersections
      })
    }

    // Initilize scroll
    this.initializeScroll = true
    setTimeout(this.viewContentScroll, 0)
  }

  @autobind
  render () {
    const props = this.props

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

    // Compare last rendered model and current to update layout
    if (this.renderedVariant && this.props.view.modelVariant !== this.renderedVariant) {
      // Force helper divs update. We have to do this, because the dimensions haven't changed
      this.forceUpdateHelperDivs = true
    }
    this.renderedVariant = props.view.modelVariant

    // ///////////// //
    // Create Guides //
    let Guides
    if (Defaults.showGuides) {
      let guides = props.view.guides
      let morphTo = props.buffer ? props.buffer.guides : false

      // If there is a snapshot, which is different from the current variant, we start morphong to the new variant. This only happens, when there is no buffer loaded (No state transition happening)
      if (props.view.snapshotVariant !== '' && props.view.snapshotVariant !== props.view.modelVariant && !props.buffer) {
        // !isEmpty(values(props.view.guidesSnapshot)) ? props.view.guidesSnapshot :
        guides = props.view.guidesSnapshot
        morphTo = props.view.guides
      }

      const guideKeys = keys(props.viewModel.guides)

      if (!isEmpty(values(guides))) {
        Guides = (
          <SvgObjectComponent className='svg-wrapper' viewBox={props.global.svgViewBox}>
            <GuidesComponent
              classNameStart={props.className + '-' + props.view.model + '-guide-'}
              guideKeys={guideKeys}
              guides={guides}
              morphTo={morphTo} />
          </SvgObjectComponent>
        )
      }
    }

    // //////////////// //
    // Create Polygons //
    let polygons = props.view.polygons
    let morphTo = props.buffer ? props.buffer.polygons : false

    // If there is a snapshot, which is different from the current variant, we start morphong to the new variant. This only happens, when there is no buffer loaded (No state transition happening)
    if (props.view.snapshotVariant !== '' && props.view.snapshotVariant !== props.view.modelVariant && !props.buffer) {
      // !isEmpty(values(props.view.guidesSnapshot)) ? props.view.guidesSnapshot :
      polygons = props.view.polygonsSnapshot
      morphTo = props.view.polygons
    }

    const polygonKeys = keys(props.viewModel.polygons)

    const Polygons = (
      <SvgObjectComponent className='svg-wrapper' viewBox={props.global.svgViewBox}>
        <PolygonsComponent
          classNameStart={props.className + '-' + props.view.model + '-polygon-'}
          pixelScale={this.props.global.pixelScale}
          isVariantMorph={props.view.transitionState === 'morphVariant'}
          polygonKeys={polygonKeys}
          polygons={polygons}
          morphTo={morphTo} />
      </SvgObjectComponent>
    )

    const contentClassName = props.view.transitionState === 'morphVariant' ? ' object-transition ' : ''

    let disabledClassName = ''
    // If this view has popups active, disable this view
    if (props.state && props.state.toJSON()['stateBasicInfo'] !== '' && props.state.basicInfo.popups && !isEmpty(props.state.basicInfo.popups.toJSON())) {
      disabledClassName = ' disabled'
    }

    let popupComponent = ''
    if (props.state && props.state.toJSON()['stateBasicInfo'] !== '') {
      popupComponent = (
        <PopupWrapper closeFunc={props.state.basicInfo.closePopup} popups={props.state.basicInfo.popups} />
      )
    }

    // //////////////// //
    // Render View //
    return (
      <div className={viewFadeClassName + ' ' + props.className + ' view-wrapper view-' + props.view.model}>
        <div className={'view-model' + ' ' + props.viewModel.className + disabledClassName}>
          {/* The view model (how the bg of the startpage looks) is shown here. That should be a svg object with guide lines and guide divs. The polygons are a overlay and go to */}
          {/* Render guide lines */}
          {Guides}
          {/* Render helper divs */}
          <HelperDivsComponent className={props.className} modelName={props.view.model} that={this} guides={props.viewModel.guides} />
        </div>
        <main
          className={'view-content' + disabledClassName}
          ref={ (viewContent) => { this.viewContent = viewContent }}
          onScroll={this.viewContentScroll}>
          {/* The actual content of the view entity (the text on the startpage, search fields, interactive stuff, etc.) active in this view  */}
          <div
            className={'content-wrapper-outer ' + props.viewModel.className + ' ' + fadeClassName + contentClassName}
            ref={ (contentWrapperOuter) => { this.contentWrapperOuter = contentWrapperOuter }} >
            {props.loadedView}
          </div>
        </main>
        <div className={'view-model view-model-overlay' + disabledClassName}>
          {Polygons}
        </div>
        <div className={'overlay-wrapper-outer ' + props.viewModel.className + ' ' + fadeClassName + contentClassName}>
          <Logo
            strokeWidth={(Defaults.DefaultStrokeWidth * props.global.pixelScale) / 8}
            className={props.viewModel.logoClassName + disabledClassName} />
          <div className={'overlay-wrapper-content' + disabledClassName}>
            {this.props.loadedOverlayView}
          </div>
          {popupComponent}
        </div>
      </div>
    )
  }
}

View.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object,
  state: PropTypes.object,
  buffer: PropTypes.object,
  viewModel: PropTypes.object,
  className: PropTypes.string,
  loadedView: PropTypes.object,
  loadedOverlayView: PropTypes.object
}

export default View
