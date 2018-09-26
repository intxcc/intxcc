'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const AboutView = observer((props) => (
  <div className='content-wrapper-inner'>
    <img className='about-picture' alt='Picture of me with triangles.' src='/pic.png' />
  </div>
))

AboutView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

const AboutOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
  </div>
))

AboutOverlayView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export { AboutView, AboutOverlayView }
