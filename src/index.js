'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

// eslint-disable-next-line
import style from '../style/index.scss'

import store from './mobx/store'

import App from './App'

ReactDOM.render(
  <App store={store} />,
  document.getElementById('app')
)

module.hot.accept()
