'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import LicenseAndImpressumLink from './Components/LicenseAndImpressumLink'

import Texts from '../../mobx/StateData/stories/Texts'

const StoriesView = observer(props => (
  <div className='fallback-view-wrapper stories-wrapper'>
    <div className='stories-wrapper-inner'>
      <h1>Stories | My Portfolio</h1>
      <div className='articles-wrapper'>
        {props.state.stories.map((story, index) => (
          <article key={'fallback-article-' + index}>
            {!props.state.stories.get(index - 1) || (props.state.stories.get(index - 1) && props.state.stories.get(index - 1).year !== story.year) ? (
              <h1 className='year-headline'>{story.year}</h1>
            ) : ''}
            <h2>{story.name} | {story.year} | {story.time} | {story.type} ({story.subType})</h2>
            {Texts[story.textName]}
          </article>
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
