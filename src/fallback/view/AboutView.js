'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const AboutView = observer(props => (
  <div className='fallback-view-wrapper about-wrapper'>
  </div>
))

AboutView.propTypes = {
  state: PropTypes.object,
  global: PropTypes.object
}

export default AboutView
