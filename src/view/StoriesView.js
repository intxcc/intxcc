'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const StoriesView = observer((props) => (
  <div className='content-wrapper-inner'>
    Stories Under
  </div>
))

StoriesView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

const StoriesOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
    Stories
  </div>
))

StoriesOverlayView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export { StoriesView, StoriesOverlayView }
