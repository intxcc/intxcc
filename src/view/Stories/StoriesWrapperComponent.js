'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import autobind from 'autobind-decorator'

import StoryComponent from './StoryComponent'
import Texts from '../../mobx/StateData/stories/Texts'

/**
 * This needs to be a component, because we want to know, how long the stories are to know when one is currently visible while scrolling
 */
@observer
class StoriesWrapperComponent extends React.Component {
  // constructor (props) {
  //   super(props)
  // }

  @autobind
  render () {
    const stories = this.props.stories.map((story, index) => (
      <StoryComponent key={'story-' + index} story={story}>
        {Texts[story.textName]}
      </StoryComponent>
    ))

    return (
      <div className='articles-container-inner'>
        {stories}
      </div>
    )
  }
}

StoriesWrapperComponent.propTypes = {
  stories: PropTypes.array
}

export default StoriesWrapperComponent
