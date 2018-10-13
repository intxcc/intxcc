'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

import App from './App'
import FallbackApp from './fallback/FallbackApp'

@observer
class AppWrapper extends React.Component {
  @autobind
  updateDimensions () {
    const siteWrapper = this.siteWrapper
    if (siteWrapper) {
      this.props.store.global.setClientDimensions(siteWrapper.clientWidth, siteWrapper.clientHeight)
    }
  }

  @autobind
  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
    window.addEventListener('hashchange', this.props.store.router.onHashChange, false)

    this.updateDimensions()

    this.props.store.router.initialize()
  }

  @autobind
  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
    window.removeEventListener('hashchange', this.props.store.router.onHashChange, false)
  }

  @autobind
  render () {
    return (
      <div ref={(siteWrapper) => { this.siteWrapper = siteWrapper }} className='site-wrapper-outer'>
        {this.props.store.global.useFallback
          ? <FallbackApp store={this.props.store} />
          : <App store={this.props.store} />}
      </div>
    )
  }
}

AppWrapper.propTypes = {
  store: PropTypes.object
}

export default AppWrapper
