'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const StoriesView = observer((props) => (
  <div className='content-wrapper-inner'>
    Stories Under
  </div>
))

StoriesView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

const ViewObject = observer((props) => {
  if (!props.object) {
    return ''
  }

  return (
    <div className={'object ' + props.object.className} style={{
      'top': props.object.pos.y,
      'left': props.object.pos.x
    }}>
      {props.children}
    </div>
  )
})

StoriesView.propTypes = {
  object: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
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
      2018
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
    <ViewObject object={props.view.objects.get('year-selection')}>
      <ul className='year-selection-list'>
        <li>2018</li>
        <li className='selected'>2017</li>
        <li>2016</li>
        <li>2015</li>
        <li>2014</li>
        <li>2012</li>
        <li>2011</li>
        <li>2010</li>
        <li>2009</li>
        <li>2008</li>
      </ul>
    </ViewObject>
  </div>
))

StoriesOverlayView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export { StoriesView, StoriesOverlayView }
