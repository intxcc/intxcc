'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const StartpageView = observer((props) => (
  <div className='content-wrapper-inner'>
    Startpage
  </div>
))

StartpageView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

const StartpageOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
    Startpage
  </div>
))

StartpageOverlayView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export { StartpageView, StartpageOverlayView }
