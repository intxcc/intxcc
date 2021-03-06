'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import SkillsMapCategory from './SkillsMapCategory'

/** Descibes an column on the skill map, with an array of categories */
const SkillsMapColumn = observer((props) => (
  <div className={'skills-map-column' + (props.selected ? ' column-selected' : '')}>
    <h1>
      {props.title}
    </h1>
    {props.categories.map(category => {
      if (!category.visible) {
        return ''
      }

      return (
        <SkillsMapCategory
          key={'skills-' + category.id}
          useSelectCallback={props.useSelectCallback}
          selected={props.selected.category && props.selected.category.id === category.id ? props.selected : false}
          centerMapFunc={props.centerMapFunc}
          title={category.title}
          skills={category.skills}>
        </SkillsMapCategory>
      )
    })}
  </div>
))

SkillsMapColumn.propTypes = {
  useSelectCallback: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  selected: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  centerMapFunc: PropTypes.func,
  title: PropTypes.string,
  categories: PropTypes.object
}

export default SkillsMapColumn
