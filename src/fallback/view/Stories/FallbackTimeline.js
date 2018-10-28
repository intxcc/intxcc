'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

const FallbackTimeline = observer(props => (
  <div className={'fallback-timeline-wrapper' + (props.active ? ' active' : '')}>
    <div className='fallback-timeline-inner'>
      <div className='fallback-timeline-inner-scroll-wrapper'>
        <ul className='fallback-stories-timeline-year-list'>
          {props.years.map((year, index) => (
            <li key={'fallback-stories-timeline-year-list-item-' + index} className='fallback-stories-timeline-year-list-item'>
              <div className='fallback-stories-timeline-year-list-item-headline'>
                {year.year}
              </div>
              <ul className='fallback-stories-timeline-stories-per-year-list'>
                {year.stories.map((story, index) => (
                  <a key={'fallback-stories-timeline-year-' + year.year + '-story-' + index} href={'#/stories/' + story.id}>
                    <li className={props.selectedStory && story.id === props.selectedStory.id ? 'selected' : ''}>
                      {story.name}
                    </li>
                  </a>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className={'fallback-timeline-shrink-btn' + (!props.showControls ? ' hide' : '')} onClick={props.toggle}>
      {props.active
        ? <FontAwesomeIcon icon={'angle-left'} />
        : <FontAwesomeIcon icon={'angle-right'} />}
    </div>
  </div>
))

FallbackTimeline.propTypes = {
  years: PropTypes.object,
  selectedStory: PropTypes.object,
  showControls: PropTypes.bool,
  active: PropTypes.bool,
  toggle: PropTypes.func
}

export default FallbackTimeline
