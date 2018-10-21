'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import StoriesFilterWrapper from './StoriesFilterWrapper'

const StoriesFilter = observer(props => (
  <StoriesFilterWrapper>
    <div className='stories-overlay-inner-content'>
      <ul className='stories-overlay-skill-list'>
        <li>C++</li>
        <li>Python</li>
        <li>HTML5</li>
      </ul>
    </div>
  </StoriesFilterWrapper>
))

StoriesFilter.propTypes = {
  filter: PropTypes.object
}

export default StoriesFilter
