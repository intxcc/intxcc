'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const StartpageView = observer(props => (
  <span>
    startpage
  </span>
))

StartpageView.propTypes = {
  state: PropTypes.object,
  global: PropTypes.object
}

export default StartpageView
