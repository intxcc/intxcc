'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import AboutTableComponent from './About/AboutTableComponent'
import AboutTextComponent from './About/AboutTextComponent'

const AboutView = observer((props) => (
  <div className='content-wrapper-inner'>
    <AboutTableComponent />
    <AboutTextComponent fallback={false} />
  </div>
))

AboutView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

const AboutOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
    <img className='about-picture' alt='Picture of me with triangles.' src='/fallback_pic.png' />
    <div className='about-page-name-display'>
      about me
      <div className='about-page-name-display-caption'>
        description
      </div>
    </div>
  </div>
))

AboutOverlayView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export { AboutView, AboutOverlayView }
