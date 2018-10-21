'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import { getNameIdentifierFromSkill } from '../miscFunctions'

import ViewObject from './General/ViewObject'
import YearSelection from './Stories/YearSelection'

import StoryComponent from './Stories/StoryComponent'
import Texts from '../mobx/StateData/stories/Texts'

const StoriesView = observer((props) => (
  <div className='content-wrapper-inner'>
    {props.state.stories.map((story, index) => (
      <StoryComponent refFunc={div => {
        props.state.setDiv(story.id, div)
      }} keyString={'story-' + story.id} key={'story-' + story.id} isSelected={story.id === props.state.selectedStory.id} story={story}>
        {Texts[story.textName]}
      </StoryComponent>
    ))}
  </div>
))

StoriesView.propTypes = {
  global: PropTypes.object,
  state: PropTypes.object,
  view: PropTypes.object
}

const StoriesOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
    <ViewObject object={props.view.objects.get('story-info-display')}>
      <span className='story-info-display-name'>
        {props.state.selectedStory.name}
      </span>
      <div className='story-info-secondary-display'>
        <b>Skills</b>{
          props.state.selectedStory.skills.map((skill, index) => (
            <a key={'selected-story-skill-link-' + index} className='selected-story-skill-link' href={'/#/skills/skill/' + getNameIdentifierFromSkill({title: skill})}>
              {/* Replaces spaces with "&nbsp;"s */}
              {skill.replace(new RegExp(' ', 'g'), ' ')}
            </a>
          ))
        }
      </div>
    </ViewObject>
    <ViewObject object={props.view.objects.get('story-name-display')}>
      {props.state.selectedStory.type}<br />
      <div className='story-name-caption'>
        {props.state.selectedStory.subType}
      </div>
    </ViewObject>
    <ViewObject object={props.view.objects.get('selected-year-display')}>
      {/* {props.state.years[props.state.selectedYear]} */}
      <span className='selected-year-caption'>
        {props.state.selectedStory.time}
      </span>
    </ViewObject>
    <YearSelection
      object={props.view.objects.get('year-selection')}
      className={'stories-year-selection'}
      years={props.state.years}
      selectedYear={props.state.selectedYear}
      selectYear={props.state.selectYear} />
    <ViewObject object={props.view.objects.get('story-page-name-display')}>
      stories
      <div className='story-page-name-display-caption'>
        portfolio
      </div>
    </ViewObject>
  </div>
))

StoriesOverlayView.propTypes = {
  global: PropTypes.object,
  state: PropTypes.object,
  view: PropTypes.object
}

export { StoriesView, StoriesOverlayView }
