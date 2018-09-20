'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const ContactView = observer((props) => (
  <div className='content-wrapper-inner'>
    Test
  </div>
))

ContactView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

const ContactOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
  </div>
))

ContactOverlayView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export { ContactView, ContactOverlayView }
