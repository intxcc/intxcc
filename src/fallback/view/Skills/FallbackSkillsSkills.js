'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

// TODO MARK SELECTED SKILL
const FallbackSkillsSkills = observer(props => (
  <div className='fallback-skills-simplified-skills'>
    {props.skills.map(skill => (
      <a key={'fallback-skills-skill-' + skill.id} className='fallback-skills-simplified-skill-link' href={'/#/skills/' + skill.id + '-' + skill.title.toLowerCase().replace(new RegExp(' ', 'g'), '-')}>
        <div
          className={'fallback-skills-simplified-skill' + (props.selection.skill && props.selection.skill.id === skill.id ? ' selected' : '')}>
          {skill.title}
        </div>
      </a>
    ))}
  </div>
))

FallbackSkillsSkills.propTypes = {
  selection: PropTypes.object,
  skills: PropTypes.array
}

export default FallbackSkillsSkills
