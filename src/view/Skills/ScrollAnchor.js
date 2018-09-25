'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import PointerLock from '../Components/PointerLock'

const ScrollAnchor = observer((props) => (
  <div className='skills-map-scroll-anchor'>
    <div className='skills-map-scroll-anchor-caption scroll-hint'>
      use scroll or
    </div>
    <div className='skills-map-scroll-anchor-symbol'>
      <FontAwesomeIcon icon={'arrows-alt'} />
    </div>
    <div className='skills-map-scroll-anchor-caption'>
      move
    </div>
    <div className='skills-map-scroll-anchor-symbol toggle' onClick={props.state.toggleMouseDrag}>
      {props.state.mouseDragEnabled ? <FontAwesomeIcon icon={['far', 'check-square']} /> : <FontAwesomeIcon icon={['far', 'square']} />}
    </div>
    <div className='skills-map-scroll-anchor-caption toggle' onClick={props.state.toggleMouseDrag}>
      enable drag
    </div>
    <PointerLock onPointerLockChange={props.state.onPointerLockChange} onMovement={props.state.moveMapBy} className='pointer-lock-canvas' />
  </div>
))

ScrollAnchor.propTypes = {
  state: PropTypes.object
}

export default ScrollAnchor
