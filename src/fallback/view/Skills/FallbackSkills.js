'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import FallbackSkillColumns from './FallbackSkillColumns'

const FallbackSkills = observer(props => (
  <div className='fallback-skills-simplified-overview'>
    <FallbackSkillColumns columns={props.columns} selection={props.state.selection} />
  </div>
))

FallbackSkills.propTypes = {
  state: PropTypes.object,
  columns: PropTypes.object
}

export default FallbackSkills
