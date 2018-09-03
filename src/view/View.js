'use strict'

import React from 'react'
import PropTypes from 'prop-types'

const View = (props) => (
  <div>
    View: {props.view.model}
  </div>
)

View.propTypes = {
  view: PropTypes.object
}

export default View
