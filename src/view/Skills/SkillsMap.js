'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import SkillsMapColumn from './SkillsMapColumn'
import SkillsMapCategory from './SkillsMapCategory'
import SkillsMapItem from './SkillsMapItem'

const SkillsMap = observer((props) => (
  <div className='skills-map-wrapper'>
    {props.columns.map(column => (
      <SkillsMapColumn key={'skills-column-' + column.title} title={column.title}>
        {column.categories.map(category => (
          <SkillsMapCategory key={'skills-category-' + column.title + '-' + category.title} title={category.title}>
            {category.skills.map(skill => (
              <SkillsMapItem key={'skills-item-' + column.title + '-' + category.title + '-' + skill.title} title={skill.title} />
            ))}
          </SkillsMapCategory>
        ))}
      </SkillsMapColumn>
    ))}
  </div>
))

SkillsMap.propTypes = {
  columns: PropTypes.array
}

export default SkillsMap
