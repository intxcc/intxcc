'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const StoriesView = observer((props) => (
  <div className='content-wrapper-inner'>
    Startpage
    {props.global.clientWidth}
  </div>
))

StoriesView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export default StoriesView
