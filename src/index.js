'use strict'

// ///////////////// //
// IMPORT POLYFILLS //

import './polyfills/ObjectAssignPolyfill'
import smoothscroll from 'smoothscroll-polyfill'

// ////// //
// START //

import React from 'react'
import ReactDOM from 'react-dom'

// eslint-disable-next-line
import style from '../style/index.scss'

// Defines the fontawesome library with icons we want to use
import './fontawesome'

import store from './mobx/store'

import AppWrapper from './AppWrapper'

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
