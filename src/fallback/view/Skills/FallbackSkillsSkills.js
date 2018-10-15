'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

// TODO MARK SELECTED SKILL
const FallbackSkillsSkills = observer(props => (
  <div className='fallback-skills-simplified-skills'>
    {props.skills.map(skill => (
      <div
        key={'fallback-skills-skill-' + skill.id}
        className={'fallback-skills-simplified-skill'}>
        {skill.title}
      </div>
    ))}
  </div>
))

FallbackSkillsSkills.propTypes = {
  selection: PropTypes.object,
  skills: PropTypes.array
}

export default FallbackSkillsSkills
