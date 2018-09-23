'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const SkillsMapColumn = observer((props) => (
  <div className={'skills-map-column' + (props.selected ? ' column-selected' : '')}>
    <h1>
      {props.title}
    </h1>
    {props.children}
  </div>
))

SkillsMapColumn.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.array
}

export default SkillsMapColumn
