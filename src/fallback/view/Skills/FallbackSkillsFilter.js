'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

const FallbackSkillsFilter = observer(props => (
  <div className={'fallback-skills-filter-wrapper' + (props.show ? ' show' : '')}>
    <div className='fallback-skills-filter-inner'>
      <h1>Filter</h1>
    </div>
    <div onClick={() => props.state.fallbackSetShowFilter(false)} className='fallback-skill-filter-button'>
      <FontAwesomeIcon icon={'window-close'} />
    </div>
  </div>
))

FallbackSkillsFilter.propTypes = {
  show: PropTypes.bool,
  state: PropTypes.object
}

export default FallbackSkillsFilter
