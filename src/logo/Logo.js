'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import LogoPath from './LogoPath'

const Logo = observer((props) => (
  <div className={props.className + ' logo-wrapper'}>
    <LogoPath className={'logo logo-normal'} />
    <LogoPath className={'logo logo-inverted'} invert={true} />
  </div>
))

Logo.propTypes = {
  className: PropTypes.string
}

export default Logo
