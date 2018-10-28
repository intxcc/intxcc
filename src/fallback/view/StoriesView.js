'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import { getNameIdentifierFromSkill } from '../../miscFunctions'

import Texts from '../../mobx/StateData/stories/Texts'

import LicenseAndImpressumLink from './Components/LicenseAndImpressumLink'
import FallbackTimeline from './Stories/FallbackTimeline'

const StoriesView = observer(props => (
  <div className='fallback-view-wrapper stories-wrapper'>
    <div className='show-help-btn-wrapper'>
      <div className='show-help-btn' onClick={props.state.showExplanation}>
        <FontAwesomeIcon icon={'info'} />
      </div>
    </div>
    <div className='stories-wrapper-inner'>
      <h1>Stories | My Portfolio</h1>
      <FallbackTimeline />
      <div className='articles-wrapper'>
        {props.state.stories.map((story, index) => (
          <article key={'fallback-article-' + index}>
            {!props.state.stories.get(index - 1) || (props.state.stories.get(index - 1) && props.state.stories.get(index - 1).year !== story.year) ? (
              <h1 className='year-headline'>{story.year}</h1>
            ) : ''}
            <h2>{story.name} | {story.year} | {story.time} | {story.type} ({story.subType})</h2>
            <ul className='fallback-story-skills-list'>
              <li><h3>Skills</h3></li>
              {story.skills.map((skill, index) => (
                <li key={story.name + '-link-' + index} className='fallback-story-skills-list-item'>
                  <a href={'/#/skills/skill/' + getNameIdentifierFromSkill({title: skill})}>
                    {skill.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
            <div className='fallback-story-spacer'></div>
            <h3>{story.summary}</h3>
            <div className='fallback-story-spacer'></div>
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
