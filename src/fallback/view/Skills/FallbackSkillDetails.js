'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import MARK_TOOLTIP from '../../../config/MarkTooltips'

const FallbackSkillDetails = observer(props => (
  <div className={'fallback-skill-details-wrapper' + (props.show ? ' show' : '')}>
    <div onClick={props.closeSkillDetailsFunc} className='fallback-skill-details-close-button'>
      <FontAwesomeIcon icon={'times'} />
    </div>
    <div className={'fallback-skill-details-inner' + (props.showInner ? ' show' : '')}>
      <div className='fallback-skill-details-inner-info'>
        <h2>Skill {props.indexOfSelectedSkillInSelectedSkills} of <strong>{props.selectedListLength - 1}</strong></h2>
        <h3>{MARK_TOOLTIP[props.skill.mark].toUpperCase()}</h3>
        <h1>{props.skill.title}</h1>
      </div>
      <p className='fallback-skill-details-desc'>
        {props.skill.desc}
      </p>
      <p className='fallback-skill-details-trivia'>
        {props.skill.trivia}
      </p>
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
  selectedListLength: PropTypes.number,
  indexOfSelectedSkillInSelectedSkills: PropTypes.number,
  show: PropTypes.bool,
  showInner: PropTypes.bool,
  scrollSkillFunc: PropTypes.func,
  closeSkillDetailsFunc: PropTypes.func,
  skill: PropTypes.object
}

export default FallbackSkillDetails
