'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const SkillsMapItem = observer((props) => (
  <div className={'skills-map-item' + (props.selected ? ' item-selected' : '')}>
    {props.title}
  </div>
))

SkillsMapItem.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string
}

export default SkillsMapItem
