'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

/** Describes the zoom controls for the skill map. Is used from the normal and the fallback view, but with different style. */
const SkillsMapZoom = observer((props) => (
  <div className='skills-map-zoom-wrapper'>
    <div className='skills-map-zoom-btn'>
      <FontAwesomeIcon onClick={() => props.changeMapScaleFunc(0.1)} icon={'plus'} />
    </div>
    <div className='skills-map-zoom-btn'>
      <FontAwesomeIcon onClick={() => props.changeMapScaleFunc(false, 1)} icon={['far', 'circle']} />
    </div>
    <div className='skills-map-zoom-btn'>
      <FontAwesomeIcon onClick={() => props.changeMapScaleFunc(-0.1)} icon={'minus'} />
    </div>
  </div>
))

SkillsMapZoom.propTypes = {
  changeMapScaleFunc: PropTypes.func
}

export default SkillsMapZoom
