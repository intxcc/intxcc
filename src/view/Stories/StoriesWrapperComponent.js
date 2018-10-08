'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import StoryComponent from './StoryComponent'
import Texts from '../../mobx/StateData/stories/Texts'

/**
 * This needs to be a component, because we want to know, how long the stories are to know when one is currently visible while scrolling
 */
const StoriesWrapperComponent = observer((props) => (
  <div className='articles-container'>
    {props.stories.map((story, index) => (
      <StoryComponent refFunc={div => {
        props.state.setDiv(story.id, div)
      }} key={'story-' + index} story={story}>
        {Texts[story.textName]}
      </StoryComponent>
    ))}
  </div>
))

StoriesWrapperComponent.propTypes = {
  stories: PropTypes.array,
  state: PropTypes.object
}

export default StoriesWrapperComponent
