'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const AboutView = observer(props => (
  <span>
    about
  </span>
))

AboutView.propTypes = {
  state: PropTypes.object,
  global: PropTypes.object
}

export default AboutView
