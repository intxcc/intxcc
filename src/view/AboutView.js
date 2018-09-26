'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const AboutView = observer((props) => (
  <div className='content-wrapper-inner'>
    test
  </div>
))

AboutView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

const AboutOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
    overlay
  </div>
))

AboutOverlayView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export { AboutView, AboutOverlayView }
