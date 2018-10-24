'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

const SkillsMapZoom = observer((props) => (
  <div className='skills-map-zoom-wrapper'>
    <div className='skills-map-zoom-btn'>
      <FontAwesomeIcon onClick={() => props.changeMapScaleFunc(0.1)} icon={'plus-circle'} />
    </div>
    <div className='skills-map-zoom-btn'>
      <FontAwesomeIcon onClick={() => props.changeMapScaleFunc(false, 1)} icon={['far', 'circle']} />
    </div>
    <div className='skills-map-zoom-btn'>
      <FontAwesomeIcon onClick={() => props.changeMapScaleFunc(-0.1)} icon={'minus-circle'} />
    </div>
  </div>
))

SkillsMapZoom.propTypes = {
  changeMapScaleFunc: PropTypes.func
}

export default SkillsMapZoom
