'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import LicenseAndImpressumLink from './Components/LicenseAndImpressumLink'

import StoryComponent from './Stories/StoryComponent'
import FallbackTimeline from './Stories/FallbackTimeline'

const StoriesView = observer(props => (
  <div className='fallback-view-wrapper stories-wrapper'>
    <div className='show-help-btn-fallback-wrapper'>
      <div className='show-help-btn' onClick={props.state.showExplanation}>
        <FontAwesomeIcon icon={'info'} />
      </div>
    </div>
    <div className={'stories-wrapper-inner' + (props.state.fallbackShowTimeline ? ' show-timeline' : '') + (props.state.fallbackTimelineTransition ? ' transition' : '')}>
      <h1>Stories | My Portfolio</h1>
      <FallbackTimeline
        showControls={props.global.fallbackShowControls}
        active={props.state.fallbackShowTimeline}
        toggle={() => {
          props.state.setFallbackShowTimeline(!props.state.fallbackShowTimeline)
        }} />
      <div className='articles-wrapper'>
        {props.state.stories.map((story, index) => (
          <StoryComponent
            key={'fallback-article-' + index}
            story={story}
            yearHeadline={!props.state.stories.get(index - 1) || (props.state.stories.get(index - 1) && props.state.stories.get(index - 1).year !== story.year)}
            refFunc={div => {
              props.state.setDiv(story.id, div)
            }} />
        ))}
      </div>
    </div>
    <LicenseAndImpressumLink />
  </div>
))

StoriesView.propTypes = {
  state: PropTypes.object,
  global: PropTypes.object
}

export default StoriesView
