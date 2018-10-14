'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const FallbackSkills = observer(props => (
  <div className='fallback-skills-simplified-overview'>
    a
  </div>
))

FallbackSkills.propTypes = {
  state: PropTypes.object,
  columns: PropTypes.object
}

export default FallbackSkills
