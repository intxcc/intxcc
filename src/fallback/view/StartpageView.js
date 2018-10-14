'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import Defaults from '../../config/defaults'
import LogoPath from '../../logo/LogoPath'
import FallbackImageAlt from '../../config/FallbackImageAlt'

const StartpageView = observer(props => (
  <div className='fallback-view-wrapper startpage-wrapper'>
    <img className='fallback-startpage-background-image' alt={FallbackImageAlt}>
      {/* For screenreaders and the like. */}
    </img>
    <img alt='Picture of me with triangles.' className='fallback-startpage-pic' src='/fallback_pic.png' />
    <h1>
      Development and Design by Marvin Alexander Rüll
    </h1>
    <LogoPath className={'fallback-logo'} strokeWidth={Defaults.DefaultStrokeWidth / 10} />
  </div>
))

StartpageView.propTypes = {
  state: PropTypes.object,
  global: PropTypes.object
}

export default StartpageView
