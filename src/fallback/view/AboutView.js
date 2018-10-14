'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import AboutTextComponent from '../../view/About/AboutTextComponent'

const AboutView = observer(props => (
  <div className='fallback-view-wrapper about-wrapper'>
    <AboutTextComponent fallback={true} />
  </div>
))

AboutView.propTypes = {
  state: PropTypes.object,
  global: PropTypes.object
}

export default AboutView
