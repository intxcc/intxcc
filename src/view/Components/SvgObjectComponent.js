'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const SvgObjectComponent = observer((props) => (
  <svg className={props.className} viewBox={props.viewBox}>
    {props.children}
  </svg>
))

SvgObjectComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.object
  ]),
  className: PropTypes.string,
  viewBox: PropTypes.string
}

export default SvgObjectComponent
