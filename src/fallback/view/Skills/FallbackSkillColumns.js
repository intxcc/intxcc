'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const FallbackSkillColumns = observer(props => (
  <div className='fallback-skills-simplified-columns'>
    <h2>Select Topics</h2>
    {props.columns.map(column => (
      <div
        key={'fallback-skills-column-' + column.id}
        className={'fallback-skills-list-item fallback-skills-simplified-column' + (props.fallbackSelection.isColumnSelected(column.id) ? ' active' : '') + (props.selection.column && props.selection.column.id === column.id ? ' selected' : '')}
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
