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
          <div className={'add-skill-to-stories-filter-btn' + (props.filter.addSkillMode ? ' add-skill-mode-active' : '')}>
            <FontAwesomeIcon icon={'plus-square'} onClick={props.filter.toggleAddSkillMode} />
          </div>
          <div className='clear-stories-filter-btn'>
            <FontAwesomeIcon icon={'trash'} onClick={props.filter.clearSelection} />
          </div>
        </li>
      </ul>
    </div>
  </StoriesFilterWrapper>
))

StoriesFilter.propTypes = {
  filter: PropTypes.object
}

export default StoriesFilter
