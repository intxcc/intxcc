'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

// eslint-disable-next-line
import style from '../style/index.scss'

import store from './mobx/store'

import App from './App'

// ///////// //
// POLYFILLS //

import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

// /////////// //
// RENDER APP //

ReactDOM.render(
  <App store={store} />,
  document.getElementById('app')
)

// TODO Remove before going into production
module.hot.accept()
