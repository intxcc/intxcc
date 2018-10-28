'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

const FallbackTimeline = observer(props => (
  <div className={'fallback-timeline-wrapper' + (props.active ? ' active' : '')}>
    <div className='fallback-timeline-inner'>
      a
    </div>
    <div className={'fallback-timeline-shrink-btn' + (!props.showControls ? ' hide' : '')} onClick={props.toggle}>
      {props.active
        ? <FontAwesomeIcon icon={'angle-left'} />
        : <FontAwesomeIcon icon={'angle-right'} />}
    </div>
  </div>
))

FallbackTimeline.propTypes = {
  showControls: PropTypes.bool,
  active: PropTypes.bool,
  toggle: PropTypes.func
}

export default FallbackTimeline
