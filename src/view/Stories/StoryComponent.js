'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import writtenNumber from 'written-number'

import { getNameIdentifierFromSkill } from '../../miscFunctions'

const StoryComponent = observer(props => (
  <article ref={div => { props.refFunc(div) }} >
    <div className={'article-inner' + (props.isSelected ? ' selected' : '')}>
      <h1>
        <ul className='article-h1-list'>
          <li><b>STORY</b></li>
          <li>{props.story.name.toLowerCase()}</li>
          <li><b>YEAR</b></li>
          <li>{writtenNumber(props.story.year, {noAnd: true}).toLowerCase()}</li>
          {props.story.time ? <li><b>TIME</b></li> : ''}
          {props.story.time ? <li>{props.story.time.toLowerCase()}</li> : ''}
          <li><b>TYPE</b></li>
          <li>{props.story.type}{props.story.subType ? ' | ' + props.story.subType : ''}</li>
        </ul>
        <div className='article-h1-spacer'></div>
        <ul className='article-h1-skill-list'>
          <li><b>SKILLS</b></li>
          {props.story.skills.map((skill, index) => (
            <a key={props.story.name + '-link-' + index} href={'/#/skills/skill/' + getNameIdentifierFromSkill({title: skill})}><li className='story-header-skills-item'>
              {skill.toUpperCase()}
            </li></a>
          ))}
        </ul>
      </h1>
      <h2>
        <div className='h2-filler h2-filler-left'></div>
        <p>
          {props.story.summary}
        </p>
        <div className='h2-filler h2-filler-right'></div>
      </h2>
      <div className='h2-spacer'></div>
      <div className='clear-both'></div>
      {props.children}
    </div>
  </article>
))

StoryComponent.propTypes = {
  children: PropTypes.object,
  isSelected: PropTypes.bool,
  refFunc: PropTypes.func,
  story: PropTypes.object
}

export default StoryComponent
