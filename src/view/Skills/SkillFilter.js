'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const SkillFilter = observer((props) => (
  <div className={'skill-filter-wrapper' + (props.showSkillFilter ? ' skill-filter-visible' : '')}>
    <h1>skill filter</h1>
  </div>
))

SkillFilter.propTypes = {
  showSkillFilter: PropTypes.bool,
  state: PropTypes.object
}

export default SkillFilter
