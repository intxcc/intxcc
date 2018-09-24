'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import PointerLock from '../Components/PointerLock'

import SkillsMapColumns from './SkillsMapColumns'

const SkillsMap = observer((props) => (
  <div onWheel={(e) => {
    const n = e.deltaY > 0 ? 1 : -1
    props.state.scrollSkill(n)
  }} onMouseDown={props.state.onMouseDown} onMouseUp={props.state.onMouseUp} onMouseMove={props.state.onMouseMove} className='skills-map-outer-wrapper'>
    <div className={'skills-map-wrapper' + ((props.state.transitionOn ? ' transition' : '')) + (!props.state.mouseDragEnabled ? ' no-drag' : '')}
      style={{
        'transform': 'translate3d(-50%, -50%, 0) translate3d(' + props.state.mapPosition.x + 'px,' + props.state.mapPosition.y + 'px, 0) rotate(30deg)'
      }}>
      <SkillsMapColumns onSkillClick={props.state.onSkillClick} selected={props.state.selection} centerMapFunc={props.state.centerMap} columns={props.columns} />
    </div>
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
  </div>
))

SkillsMap.propTypes = {
  state: PropTypes.object,
  columns: PropTypes.array
}

export default SkillsMap
