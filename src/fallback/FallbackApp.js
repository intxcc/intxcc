'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

import StartpageView from './view/StartpageView'
import AboutView from './view/AboutView'

const Views = {
  'startpage': StartpageView,
  'about': AboutView
}

@observer
class FallbackApp extends React.Component {
  @autobind
  render () {
    const loadView = Views[this.props.store.global.activePage] ? React.createElement(Views[this.props.store.global.activePage], {
      global: this.props.store.global,
      state: this.props.store.state[this.props.store.global.activePage]
    }) : <span>404</span> // TODO Show real 404

    return (
      <div className='fallback-site-wrapper'>
        {loadView}
      </div>
    )
  }
}

FallbackApp.propTypes = {
  store: PropTypes.object
}

export default FallbackApp
