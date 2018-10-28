'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react'

import { getNameIdentifierFromSkill } from '../../../miscFunctions'

import MARK_TOOLTIP from '../../../config/MarkTooltips'

const FallbackSkillsSkillWithCommentsDisplay = observer(props => (
  <div title={'with comment'} className='fallback-skills-skill-with-comments'>
    <FontAwesomeIcon icon={['far', 'comment-dots']} />
  </div>
))

const FallbackSkillsSkillMarkDisplay = observer(props => (
  <div title={MARK_TOOLTIP[props.mark]} className='fallback-skills-skill-mark' style={{
    'opacity': ((props.mark + 0.5) / 3.5)
  }}>
    {props.mark}
  </div>
))

FallbackSkillsSkillMarkDisplay.propTypes = {
  mark: PropTypes.number
}

const FallbackSkillsSkills = observer(props => (
  <div className='fallback-skills-simplified-skills'>
    <a id='fallback-skills-simplified-overview-skills-start-anchor'></a>
    <h2>Skills</h2>
    {props.skills.map((skill, index) => {
      // Check if current item is headline
      if (skill.type === 'category-headline') {
        // If the category ifs empty, don't show category-headline
        if (index + 1 === props.skills.length ||
          (index + 1 < props.skills.length && props.skills[index + 1].type === 'category-headline')) {
          return ''
        }

        return (
          <h3 key={'fallback-category-headline-' + index}>
            {skill.title}
          </h3>
        )
      }

      const isSelected = props.selection.skill && props.selection.skill.id === skill.id
      const href = '/#/skills/' + skill.id + '-' + getNameIdentifierFromSkill(skill)
      return (
        <a key={'fallback-skills-skill-' + skill.id} href={href} className='fallback-skills-simplified-skill-link' onClick={props.openSkillDetailsFunc}>
          <div
            className={'fallback-skills-list-item fallback-skills-simplified-skill' + (isSelected ? ' selected' : '')}>
            <FallbackSkillsSkillMarkDisplay mark={skill.mark} /> {skill.desc || skill.trivia ? <FallbackSkillsSkillWithCommentsDisplay /> : ''} {skill.title}
          </div>
        </a>
      )
    })}
  </div>
))

FallbackSkillsSkills.propTypes = {
  openSkillDetailsFunc: PropTypes.func,
  selection: PropTypes.object,
  skills: PropTypes.array
}

export default FallbackSkillsSkills
