'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import App from './App'
import FallbackApp from './fallback/FallbackApp'

@observer
class AppWrapper extends React.Component {
  constructor (props) {
    super(props)

    this.updateDimensions = this.updateDimensions.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.render = this.render.bind(this)
  }

  updateDimensions () {
    const siteWrapper = this.siteWrapper
    if (siteWrapper) {
      this.props.store.global.setClientDimensions(siteWrapper.clientWidth, siteWrapper.clientHeight)
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
    window.addEventListener('hashchange', this.props.store.router.onHashChange, false)

    this.updateDimensions()

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
