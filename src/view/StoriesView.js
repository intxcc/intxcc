'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import ViewObject from './General/ViewObject'
import YearSelection from './Stories/YearSelection'

const StoriesView = observer((props) => (
  <div className='content-wrapper-inner'>
    Stories Under
  </div>
))

StoriesView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

const StoriesOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
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
    <ViewObject object={props.view.objects.get('story-info-display')}>
      OwnTrack
      <div className='story-info-secondary-display'>
        <b>Skills</b> java | android studio | mysql | python | php
      </div>
    </ViewObject>
    <YearSelection
      object={props.view.objects.get('year-selection')}
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
  view: PropTypes.object
}

export { StoriesView, StoriesOverlayView }
