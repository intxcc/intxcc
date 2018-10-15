'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

const GoToTopButton = observer(props => (
  <div onClick={() => window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })} className={'fallback-goto-top-btn' + (props.show ? ' show' : '')}>
    <FontAwesomeIcon icon='arrow-circle-up' />
  </div>
))

GoToTopButton.propTypes = {
  show: PropTypes.bool
}

export default GoToTopButton
