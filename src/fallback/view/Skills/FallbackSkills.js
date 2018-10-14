'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const FallbackSkills = observer(props => (
  <div className='fallback-skills-overview-wrapper'>
  </div>
))

FallbackSkills.propTypes = {
  state: PropTypes.object,
  columns: PropTypes.array
}

export default FallbackSkills
