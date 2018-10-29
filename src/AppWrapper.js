'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import App from './App'
import FallbackApp from './fallback/FallbackApp'

/** The app wrapper controls some very basic functions, like the router and the dimension update in the global state, to not have redundancy in the fallback and normal view. Then it decides which view to use based on the client dimensions, particularly given by the "useFallback"-property of the global state. */
@observer
class AppWrapper extends React.Component {
  constructor (props) {
    super(props)

    // Bind functions to this
    this.updateDimensions = this.updateDimensions.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.render = this.render.bind(this)
  }

  // Update the dimensions of the global state
  updateDimensions () {
    const siteWrapper = this.siteWrapper
    if (siteWrapper) {
      this.props.store.global.setClientDimensions(siteWrapper.clientWidth, siteWrapper.clientHeight)
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)

    // Pass hash changes to the router
    window.addEventListener('hashchange', this.props.store.router.onHashChange, false)

    // Initialize the site dimensions when the component did mount
    this.updateDimensions()

    // The App.js initializes the router when the normal view is active, if we use the fallback view initialize the router here
    if (this.props.store.global.useFallback) {
      this.props.store.router.initialize()
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
    window.removeEventListener('hashchange', this.props.store.router.onHashChange, false)
  }

  render () {
    return (
      <div ref={(siteWrapper) => { this.siteWrapper = siteWrapper }} className='site-wrapper-outer'>
        {/* Decide whether to use the fallback view or not. */}
        {this.props.store.global.useFallback
          ? <FallbackApp store={this.props.store} />
          : <App router={this.props.store.router} store={this.props.store} />}
      </div>
    )
  }
}

AppWrapper.propTypes = {
  store: PropTypes.object
}

export default AppWrapper
