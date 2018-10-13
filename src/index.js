'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

// eslint-disable-next-line
import style from '../style/index.scss'

import store from './mobx/store'

import AppWrapper from './AppWrapper'

// ///////////////// //
// IMPORT POLYFILLS //

import smoothscroll from 'smoothscroll-polyfill'

// /////////////// //
// START POLYFILLS //

smoothscroll.polyfill()

// /////////// //
// RENDER APP //

ReactDOM.render(
  <AppWrapper store={store} />,
  document.getElementById('app')
)

// TODO Remove before going into production
module.hot.accept()
