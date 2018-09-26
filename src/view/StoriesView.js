'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import ViewObject from './General/ViewObject'
import YearSelection from './Stories/YearSelection'

import Texts from '../mobx/StateData/stories/Texts'

const StoriesView = observer((props) => (
  <div className='content-wrapper-inner'>
    <ViewObject object={props.view.objects.get('articles-container')}>
      {props.state.stories.map((story, index) => (
        <article key={'story-' + index}>
          <h1>
            <ul>
              <li><b>STORY</b></li>
              <li>owntrack</li>
              <li><b>YEAR</b></li>
              <li>two thousand eighteen</li>
              <li><b>TIME</b></li>
              <li>may till august</li>
              <li><b>TYPE</b></li>
              <li>mobile app | android</li>
              <li><b>SKILLS</b></li>
              <li>java | android studio | mysql | python | php</li>
            </ul>
          </h1>
          <h2>
            <div className='h2-filler h2-filler-left'></div>
            <p>
              {story.summary}
            </p>
            <div className='h2-filler h2-filler-right'></div>
          </h2>
          <div className='h2-spacer'></div>
          <div className='clear-both'></div>
          {Texts[story.textName]}
        </article>
      ))}
    </ViewObject>
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
      <span className='story-info-display-name'>OwnTrack</span>
      <div className='story-info-secondary-display'>
        <b>Skills</b> java | android studio | mysql | python | php
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
