'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { keys, values } from 'mobx'

import autobind from 'autobind-decorator'

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
        intersect: values(this.props.viewModel.guides.get(index).intersect),
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
        fill: polygon.fill,
        points: points
      })
    }
  }

  @autobind
  render () {
    const props = this.props
    const guideKeys = keys(props.viewModel.guides)

    if (this.updateTimeout === false) {
      // Set the update of the helper divs at the end of the javascript event loop queue
      this.updateTimeout = setTimeout(this.updateHelperDivs, 0)
    }

    return (
      <div className={props.className + ' view-wrapper view-' + props.view.model}>
        <div className={'view-model'}>
          {/* The view model (how the bg of the startpage looks) is shown here. That should be a svg object with guide lines, guide divs and polygons. */}
          <svg className='svg-wrapper' viewBox={props.global.svgViewBox}>
            {values(props.view.guides).map((guide, key) => {
              key = guideKeys[key]

              return (
                <path
                  key={props.className + '-' + props.view.model + '-guide-' + key}
                  d={`M ${guide.from.x},${guide.from.y} ${guide.to.x},${guide.to.y} Z`}
                  stroke='#999' strokeWidth='0.2' />
              )
            })}
          </svg>
          {/* Render helper divs */}
          {keys(props.viewModel.guides).map((key) => (
            <div
              ref={ (helperDiv) => { this.helperDivs[key] = helperDiv }}
              key={props.className + '-' + props.view.model + '-helper-div-' + key}
              className={'guide guide-' + key}>
            </div>
          ))}
        </div>
        <div className={'view-content'}>
          {/* The actual content of the view entity (the text on the startpage, search fields, interactive stuff, etc.) active in this view  */}
          width: {props.global.clientWidth}<br />
          height: {props.global.clientHeight}
        </div>
      </div>
    )
  }
}

View.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object,
  viewModel: PropTypes.object,
  className: PropTypes.string
}

export default View
