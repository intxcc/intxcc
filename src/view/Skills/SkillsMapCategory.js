'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const SkillsMapCategory = observer((props) => (
  <div className={'skills-map-category' + (props.selected ? ' category-selected' : '')}>
    <h2>
      {props.title}
    </h2>
    {props.children}
  </div>
))

SkillsMapCategory.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.array
}

export default SkillsMapCategory
