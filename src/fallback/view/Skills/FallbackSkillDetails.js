'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import LinkReplaceComponent from '../../../view/Components/LinkReplaceComponent'
import FallbackSkillDetailsStories from './FallbackSkillDetailsStories'

import MARK_TOOLTIP from '../../../config/MarkTooltips'

const FallbackSkillDetails = observer(props => {
  let markString = MARK_TOOLTIP[props.skill.mark]
  // Capitalize first letter
  markString = markString.charAt(0).toUpperCase() + markString.slice(1)

  return (
    <div className={'fallback-skill-details-wrapper' + (props.show ? ' show' : '')}>
      <div onClick={props.closeSkillDetailsFunc} className='fallback-skill-details-close-button'>
        <FontAwesomeIcon icon={'times'} />
      </div>
      <div className={'fallback-skill-details-inner' + (props.showInner ? ' show' : '')}>
        <div className='fallback-skill-details-inner-info'>
          <h2>Skill {props.indexOfSelectedSkillInSelectedSkills} of <strong>{props.selectedListLength - 1}</strong></h2>
          <h3>
            <div className='h3-item'>
              {props.column.title}
            </div>
            <div className='h3-item'>
              {props.category.title}
            </div>
            <div className='h3-item'>
              {markString}
            </div>
          </h3>
        </div>
        <div className='fallback-skill-details-inner-content'>
          <div className='fallback-skill-details-inner-title-wrapper'>
            <div onClick={() => props.scrollSkillFunc(-1)} className='fallback-skill-details-inner-button previous'>
              <FontAwesomeIcon icon={'arrow-left'} />
            </div>
            <div className='fallback-skill-details-inner-title'>{props.skill.title}</div>
            <div onClick={() => props.scrollSkillFunc(1)} className='fallback-skill-details-inner-button next'>
              <FontAwesomeIcon icon={'arrow-right'} />
            </div>
          </div>
          <div style={{clear: 'both'}}></div>
          {props.skill.wikiLink ? <a className='fallback-skill-details-view-wikipedia-link' target='_blank' rel='noopener noreferrer' href={props.skill.wikiLink}>
            Show on wikipedia
          </a> : ''}
          {props.skill.desc && props.skill.desc !== '' ? <p className='fallback-skill-details-desc'>
            <LinkReplaceComponent text={props.skill.desc} />
          </p> : ''}
          {props.skill.trivia && props.skill.trivia !== '' ? <p className='fallback-skill-details-trivia'>
            <LinkReplaceComponent text={props.skill.trivia} />
          </p> : ''}
        </div>
        <FallbackSkillDetailsStories storiesFilter={props.storiesFilter} />
      </div>
    </div>
  )
})

FallbackSkillDetails.propTypes = {
  selectedListLength: PropTypes.number,
  indexOfSelectedSkillInSelectedSkills: PropTypes.number,
  show: PropTypes.bool,
  showInner: PropTypes.bool,
  scrollSkillFunc: PropTypes.func,
  closeSkillDetailsFunc: PropTypes.func,
  column: PropTypes.object,
  category: PropTypes.object,
  skill: PropTypes.object,
  storiesFilter: PropTypes.object
}

export default FallbackSkillDetails
