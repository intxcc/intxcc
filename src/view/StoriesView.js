'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import ViewObject from './General/ViewObject'
import YearSelection from './Stories/YearSelection'
import StoriesWrapperComponent from './Stories/StoriesWrapperComponent'

const StoriesView = observer((props) => (
  <div className='content-wrapper-inner'>
    <StoriesWrapperComponent stories={props.state.stories} state={props.state} />
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
            <a key={'selected-story-skill-link-' + index} className='selected-story-skill-link' href={'/#/skills/skill/' + skill.replace(new RegExp(' ', 'g'), '-')}>{skill}</a>
          ))
        }
      </div>
    </ViewObject>
    <ViewObject object={props.view.objects.get('story-name-display')}>
      Mobile App<br />
      <div className='story-name-caption'>
        Android
      </div>
    </ViewObject>
    <ViewObject object={props.view.objects.get('selected-year-display')}>
      {props.state.years[props.state.selectedYear]}
      <span className='selected-year-caption'>
        May Till August
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
