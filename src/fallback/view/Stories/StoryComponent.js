'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import { getNameIdentifierFromSkill } from '../../../miscFunctions'

import Texts from '../../../mobx/StateData/stories/Texts'

const StoryComponent = observer(props => (
  <article ref={div => { props.refFunc(div) }} >
    {props.yearHeadline ? (
      <h1 className='year-headline'>{props.story.year}</h1>
    ) : ''}
    <h2>{props.story.name} | {props.story.year} | {props.story.time} | {props.story.type} ({props.story.subType})</h2>
    <ul className='fallback-story-skills-list'>
      <li><h3>Skills</h3></li>
      {props.story.skills.map((skill, index) => (
        <li key={props.story.name + '-link-' + index} className='fallback-story-skills-list-item'>
          <a href={'/#/skills/skill/' + getNameIdentifierFromSkill({title: skill})}>
            {skill.toUpperCase()}
          </a>
        </li>
      ))}
    </ul>
    <div className='fallback-story-spacer'></div>
    <h3>{props.story.summary}</h3>
    <div className='fallback-story-spacer'></div>
    {Texts[props.story.textName]}
  </article>
))

StoryComponent.propTypes = {
  yearHeadline: PropTypes.bool,
  refFunc: PropTypes.func,
  story: PropTypes.object
}

export default StoryComponent
