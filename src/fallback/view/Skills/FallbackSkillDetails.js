'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

const FallbackSkillDetails = observer(props => (
  <div className={'fallback-skill-details-wrapper' + (props.show ? ' show' : '')}>
    <div onClick={props.closeSkillDetailsFunc} className='fallback-skill-details-close-button'>
      <FontAwesomeIcon icon={'times'} />
    </div>
    <div className='fallback-skill-details-inner'>
      <h1>{props.skill.title}</h1>
      <div onClick={() => props.scrollSkillFunc(-1)} className='fallback-skill-details-inner-bottom-button previous'>
        <FontAwesomeIcon icon={'arrow-circle-left'} />
      </div>
      <div onClick={() => props.scrollSkillFunc(1)} className='fallback-skill-details-inner-bottom-button next'>
        <FontAwesomeIcon icon={'arrow-circle-right'} />
      </div>
    </div>
  </div>
))

FallbackSkillDetails.propTypes = {
  show: PropTypes.bool,
  scrollSkillFunc: PropTypes.func,
  closeSkillDetailsFunc: PropTypes.func,
  skill: PropTypes.object
}

export default FallbackSkillDetails
