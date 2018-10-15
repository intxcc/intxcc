'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

// TODO MARK SELECTED SKILL
const FallbackSkillsSkills = observer(props => (
  <div className='fallback-skills-simplified-skills'>
    <h2>Skills</h2>
    {props.skills.map((skill, index) => {
      // Check if current item is headline
      if (skill.type === 'category-headline') {
        return (
          <h3 key={'fallback-category-headline-' + index}>
            {skill.title}
          </h3>
        )
      }

      const isSelected = props.selection.skill && props.selection.skill.id === skill.id
      const href = '/#/skills/' + (!isSelected ? skill.id + '-' + skill.title.toLowerCase().replace(new RegExp(' ', 'g'), '-') : '')
      return (
        <a key={'fallback-skills-skill-' + skill.id} href={href} className='fallback-skills-simplified-skill-link' >
          <div
            className={'fallback-skills-list-item fallback-skills-simplified-skill' + (isSelected ? ' selected' : '')}>
            {skill.title}
          </div>
        </a>
      )
    })}
  </div>
))

FallbackSkillsSkills.propTypes = {
  selection: PropTypes.object,
  skills: PropTypes.array
}

export default FallbackSkillsSkills
