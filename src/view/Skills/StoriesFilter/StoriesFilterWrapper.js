'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

/**
 * The pupose of this wrapper is to simulate clip-path behaviour for edge. So we use different divs with overflow: hidden and transforms in the CSS, to simulate the edges of the clip-path.
 */

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

export default StoriesFilterWrapper
