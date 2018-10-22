'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import StoriesFilterWrapper from './StoriesFilterWrapper'

const StoriesFilter = observer(props => (
  <StoriesFilterWrapper>
    <div className='stories-overlay-inner-content'>
      <ul className='stories-overlay-skill-list'>
        {props.filter.selectedSkills.map((skill, index) => (
          <li key={'stories-filter-selected-skill-' + index}>{skill.title}</li>
        ))}
        <li>
          <div className='minus-stories-filter-btn'>
            <FontAwesomeIcon icon={['far', 'minus-square']} onClick={props.filter.deleteLastSelection} />
          </div>
          <div className='clear-stories-filter-btn'>
            <FontAwesomeIcon icon={'eraser'} onClick={props.filter.clearSelection} />
          </div>
          <div className={'add-skill-to-stories-filter-btn' + (props.filter.addSkillMode ? ' add-skill-mode-active' : '')}>
            <FontAwesomeIcon icon={['far', 'plus-square']} onClick={props.filter.toggleAddSkillMode} />
          </div>
        </li>
      </ul>
      <div className='stories-overlay-stories-list-wrapper'>
        <ul className='stories-overlay-stories-list'>
          {props.filter.filteredStories.map((story, index) => (
            <a key={'stories-filter-filtered-story-' + index} href={'/#/stories/' + story.id}>
              <li>
                <div className='stories-filter-filtered-story-year'>
                  {story.year}
                </div>
                <div className='stories-filter-filtered-story-info'>
                  <h2>{story.type} | {story.subType}</h2>
                  <h1>
                    {story.name}
                  </h1>
                </div>
              </li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  </StoriesFilterWrapper>
))

StoriesFilter.propTypes = {
  filter: PropTypes.object
}

export default StoriesFilter
