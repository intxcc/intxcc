'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import { getNameIdentifierFromSkill } from '../miscFunctions'

import ViewObject from './General/ViewObject'

import StoryComponent from './Stories/StoryComponent'
import Texts from '../mobx/StateData/stories/Texts'

const StoriesView = observer((props) => (
  <div className='content-wrapper-inner'>
    {props.state.stories.map((story, index) => {
      const storyBeforeIndex = index - 1
      let yearHeadline = false
      if (storyBeforeIndex < 0) {
        yearHeadline = story.year
      } else {
        const storyBefore = props.state.stories.get(storyBeforeIndex)
        if (story.year !== storyBefore.year) {
          yearHeadline = story.year
        }
      }

      return (
        <StoryComponent refFunc={div => {
          props.state.setDiv(story.id, div)
        }} index={index} yearHeadline={yearHeadline} keyString={'story-' + story.id} key={'story-' + story.id} isSelected={story.id === props.state.selectedStory.id} story={story}>
          {Texts[story.textName]}
        </StoryComponent>
      )
    })}
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
      <h1>{props.state.selectedStory.year}</h1>
      <span className='selected-year-caption'>
        <strong>Timeframe</strong> {props.state.selectedStory.time}
      </span>
    </ViewObject>
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
