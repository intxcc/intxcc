'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

// TODO MARK COLUMN OF SELECTED SKILL
const FallbackSkillColumns = observer(props => (
  <div className='fallback-skills-simplified-columns'>
    {props.columns.map(column => (
      <div
        key={'fallback-skills-column-' + column.id}
        className={'fallback-skills-simplified-column' + (props.fallbackSelection.isColumnSelected(column.id) ? ' active' : '') + (props.selection.column && props.selection.column.id === column.id ? ' selected' : '')}
        onClick={() => props.fallbackSelection.toggleOrSetSelectColumn(column.id)}>
        {column.title}
      </div>
    ))}
  </div>
))

FallbackSkillColumns.propTypes = {
  selection: PropTypes.object,
  fallbackSelection: PropTypes.object,
  columns: PropTypes.object
}

export default FallbackSkillColumns
