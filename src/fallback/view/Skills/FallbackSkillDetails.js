'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const FallbackSkillDetails = observer(props => (
  <div className={'fallback-skill-details-wrapper' + (props.show ? ' show' : '')}>

  </div>
))

FallbackSkillDetails.propTypes = {
  show: PropTypes.bool
}

export default FallbackSkillDetails
