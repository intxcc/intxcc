'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import SkillsMapColumn from './SkillsMapColumn'

const SkillsMapColumns = observer((props) => (
  <div className='skills-map-inner-wrapper'>
    {props.columns.map(column => (
      <SkillsMapColumn
        key={'skills-' + column.id}
        selected={props.selected.column && props.selected.column.id === column.id ? props.selected : false}
        centerMapFunc={props.centerMapFunc}
        title={column.title}
        categories={column.categories}>
      </SkillsMapColumn>
    ))}
  </div>
))

SkillsMapColumns.propTypes = {
  selected: PropTypes.object,
  centerMapFunc: PropTypes.func,
  columns: PropTypes.object
}

export default SkillsMapColumns