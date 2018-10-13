'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

// eslint-disable-next-line
import style from '../style/index.scss'

import store from './mobx/store'

import App from './App'
import FallbackApp from './fallback/FallbackApp'

// ///////////////// //
// IMPORT POLYFILLS //

import smoothscroll from 'smoothscroll-polyfill'

// /////////////// //
// START POLYFILLS //

smoothscroll.polyfill()

// /////////////// //
// DECIDE FALLBACK //

@observer
class AppRender extends React.Component {
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

    this.updateDimensions()
  }

  @autobind
  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
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

AppRender.propTypes = {
  store: PropTypes.object
}

// /////////// //
// RENDER APP //

ReactDOM.render(
  <AppRender store={store} />,
  document.getElementById('app')
)

// TODO Remove before going into production
module.hot.accept()
