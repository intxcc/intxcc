'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const StartpageView = observer((props) => (
  <div className='content-wrapper-inner'>
    <img className='startpage-picture' alt='Picture of me with triangles.' src='/pic.jpg' />
    <div className='startpage-midline'></div>
    <div className='startpage-midline-caption'>
      design.<br />
      development.
    </div>
    <div className='startpage-picture-caption'>
      <img src='/name.svg' alt='by Marvin Alexander Rüll' />
    </div>
  </div>
))

StartpageView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

const StartpageOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
  </div>
))

StartpageOverlayView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export { StartpageView, StartpageOverlayView }
