'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const StoriesFilter = observer(props => (
  <div className='stories-overlay-inner-wrapper'>
    <ul className='stories-overlay-skill-list'>
      <li>C++</li>
      <li>Python</li>
      <li>HTML5</li>
    </ul>
  </div>
))

StoriesFilter.propTypes = {
  filter: PropTypes.object
}

export default StoriesFilter
