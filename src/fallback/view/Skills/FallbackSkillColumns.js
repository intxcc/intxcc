'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const FallbackSkillColumns = observer(props => (
  <div className='fallback-skills-simplified-columns'>
    {props.columns.map(column => (
      <span>{column.title}</span>
    ))}
  </div>
))

FallbackSkillColumns.propTypes = {
  selection: PropTypes.object,
  columns: PropTypes.object
}

export default FallbackSkillColumns
