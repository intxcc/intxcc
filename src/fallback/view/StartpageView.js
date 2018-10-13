'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import Defaults from '../../config/defaults'

import LogoPath from '../../logo/LogoPath'

const StartpageView = observer(props => (
  <div className='startpage-wrapper'>
    <LogoPath className={'fallback-logo'} strokeWidth={(Defaults.DefaultStrokeWidth * props.global.pixelScale) / 5} />
  </div>
))

StartpageView.propTypes = {
  state: PropTypes.object,
  global: PropTypes.object
}

export default StartpageView
