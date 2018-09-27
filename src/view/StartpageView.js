'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import { stringToBase64 } from '../miscFunctions'
import NameSvg from './Components/NameSvg'
import BackgroundVideo from './Startpage/BackgroundVideo'

import Defaults from '../config/defaults'

const StartpageView = observer((props) => (
  <div className='content-wrapper-inner'>
    {Defaults.enableStartpageBackgroundVideo ? <BackgroundVideo /> : ''}
    <img className='startpage-picture' alt='Picture of me with triangles.' src='/pic.png' />
    <div className='startpage-midline'></div>
    <div className='startpage-midline-caption'>
      design.<br />
      development.
    </div>
    <div className='startpage-picture-caption'>
      <img src={'data:image/svg+xml;base64,' + stringToBase64(NameSvg)} alt='by Marvin Alexander Rüll' />
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
