'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import SkillsMapItem from './SkillsMapItem'

const SkillsMapCategory = observer((props) => (
  <div className={'skills-map-category' + (props.selected ? ' category-selected' : '')}>
    <div className={'skills-map-category-inner'}>
      <h2>
        {props.title}
      </h2>
      {props.skills.map(skill => (
        <SkillsMapItem
          key={'skills-' + skill.id}
          selected={props.selected.skill && props.selected.skill.id === skill.id}
          centerMapFunc={props.centerMapFunc}
          skill={skill}>
        </SkillsMapItem>
      ))}
    </div>
  </div>
))

SkillsMapCategory.propTypes = {
  selected: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  centerMapFunc: PropTypes.func,
  title: PropTypes.string,
  skills: PropTypes.array
}

export default SkillsMapCategory
