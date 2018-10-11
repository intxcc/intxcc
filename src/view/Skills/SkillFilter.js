'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const SkillFilter = observer((props) => (
  <div className='skill-filter-wrapper'>
  </div>
))

SkillFilter.propTypes = {
  state: PropTypes.object
}

export default SkillFilter
