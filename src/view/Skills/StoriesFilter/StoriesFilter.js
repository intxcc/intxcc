'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const StoriesFilterWrapper = observer(props => (
  <div className='stories-overlay-inner-wrapper'>
    <div className='stories-overlay-inner-wrapper-2'>
      <div className='stories-overlay-inner-wrapper-3'>
        <div className='stories-overlay-inner-wrapper-4'>
          {props.children}
        </div>
      </div>
    </div>
  </div>
))

StoriesFilterWrapper.propTypes = {
  children: PropTypes.object
}

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
