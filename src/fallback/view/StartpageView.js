'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import Defaults from '../../config/defaults'

import LogoPath from '../../logo/LogoPath'

const StartpageView = observer(props => (
  <div className='startpage-wrapper'>
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
