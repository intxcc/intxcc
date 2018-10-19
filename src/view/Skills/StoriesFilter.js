'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const StoriesFilter = observer(props => (
  <div className='stories-overlay-inner-wrapper'>
    <div className='stories-overlay-toggle-show-btn' onClick={props.filter.toggleShow}>
      +
    </div>
  </div>
))

StoriesFilter.propTypes = {
  filter: PropTypes.object
}

export default StoriesFilter
