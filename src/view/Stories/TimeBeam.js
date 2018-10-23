'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const TimeBeam = observer(props => (
  <div className='stories-time-beam-wrapper'>
    <ul className='stories-time-beam-year-list'>
      {props.state.years.map((year, index) => (
        <li key={'time-beam-year-list-item-' + index} className='time-beam-year-list-item'>
          <div className='stories-time-beam-year-list-item-headline'>
            {year.year}
          </div>
          <ul className='stories-time-beam-stories-per-year-list'>
            {year.stories.map((story, index) => (
              <a key={'time-beam-year-' + year.year + '-story-' + index} href={'#/stories/' + story.id}>
                <li className={props.state.selectedStory && story.id === props.state.selectedStory.id ? 'selected' : ''}>
                  {story.name}
                </li>
              </a>
            ))}
          </ul>
        </li>
      ))}
    </ul>
    <div className='timebeam-headline'>
      Timeline
    </div>
  </div>
))

TimeBeam.propTypes = {
  state: PropTypes.object
}

export default TimeBeam
