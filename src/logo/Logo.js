'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import LogoPath from './LogoPath'

const Logo = observer((props) => (
  <div className={props.className + ' logo-wrapper'}>
    <a className={'logo-link'} href='#/'>
      <LogoPath className={'logo logo-normal'} transparent={props.transparent} strokeWidth={props.strokeWidth} />
      <LogoPath className={'logo logo-inverted'} strokeWidth={props.strokeWidth} invert={true} />
    </a>
  </div>
))

Logo.propTypes = {
  transparent: PropTypes.bool,
  strokeWidth: PropTypes.number,
  className: PropTypes.string
}

export default Logo
