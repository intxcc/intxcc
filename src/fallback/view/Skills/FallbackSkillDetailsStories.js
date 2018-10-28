'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const FallbackSkillDetailsStories = observer(props => (
  <div className='fallback-skill-details-stories-wrapper'>
    <h1 className='fallback-skill-details-stories-headline'><b>Stories</b> using this skill</h1>
    <ul className='fallback-skill-details-stories-list'>
      {props.storiesFilter.filteredStories.map((story, index) => (
        <a key={'stories-filter-filtered-story-' + index} href={'/#/stories/' + story.id}>
          <li>
            <h2><b>{story.year}</b>&nbsp;{story.type} | {story.subType}</h2>
            <h1>
              {story.name}
            </h1>
          </li>
        </a>
      ))}
    </ul>
  </div>
))

FallbackSkillDetailsStories.propTypes = {
  storiesFilter: PropTypes.object
}

export default FallbackSkillDetailsStories
