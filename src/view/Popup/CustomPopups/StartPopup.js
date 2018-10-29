'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const COUNTMAXINSECONDS = 15
const COUNTSTEPTIMEMS = 100

/** Describes the popup on the startpage. It is not persistent. */
@observer
class StartPopup extends React.Component {
  constructor (props) {
    super(props)

    // Initialize the counter
    this.state = {
      count: COUNTMAXINSECONDS
    }

    // Initialize the countTimeout
    this.countTimeout = false

    // Bind all functions
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.count = this.count.bind(this)
    this.render = this.render.bind(this)
  }

  componentDidMount () {
    // This variable is used, so the count function knows the count-function is still active and skips otherwise
    this.isActive = true

    // Start the counter
    this.countTimeout = setTimeout(this.count, COUNTSTEPTIMEMS)
  }

  componentWillUnmount () {
    // In case the count should still be called, tell it this Component is not active anymore
    this.isActive = false

    // Clear any active timeout
    clearTimeout(this.countTimeout)
  }

  count () {
    // Skip if component did unmount
    if (!this.isActive) {
      return
    }

    let newCount = this.state.count - (COUNTSTEPTIMEMS / 1000)

    // If the counter reached 0, close the overlay
    if (newCount < 0) {
      this.props.closeFunc()
      return
    }

    this.setState({
      count: newCount
    })

    // Call again after 1 second
    this.countTimeout = setTimeout(this.count, COUNTSTEPTIMEMS)
  }

  render () {
    return (
      <div className='popup start-popup'>
        <h2>
          <span>this is intxcc</span><br />
          <span>this is future</span><br />
          <span>this is warm summer rain</span><br />
          <span className='start-popup-for-you-span'>This is for you.</span>
        </h2>
        <h1>This is development, design &amp; art from Berlin.</h1>
        <div className='start-popup-btn-wrapper'>
          <div onClick={this.props.closeFunc} className='start-popup-btn btn-1'>
            Continue to start
            <div className='start-popup-close-progress-bar' style={{
              'transform': 'scaleX(' + (this.state.count / COUNTMAXINSECONDS) + ')'
            }}></div>
          </div>
          <div onClick={this.props.closeFunc} className='start-popup-btn btn-2'>
            I hate summer rain.
          </div>
        </div>
      </div>
    )
  }
}

StartPopup.propTypes = {
  closeFunc: PropTypes.func,
  popup: PropTypes.object
}

export default StartPopup
