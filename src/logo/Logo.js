'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import LogoPath from './LogoPath'

const Logo = observer((props) => (
  <div className={props.className + ' logo-wrapper'}>
    <a className={'logo-link'} href='#/'>
      <LogoPath className={'logo logo-normal'} />
      <LogoPath className={'logo logo-inverted'} invert={true} />
    </a>
  </div>
))

Logo.propTypes = {
  className: PropTypes.string
}

export default Logo
