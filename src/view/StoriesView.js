'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const StoriesView = observer((props) => (
  <span>
    {props.global.clientWidth}
  </span>
))

StoriesView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export default StoriesView
