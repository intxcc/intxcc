'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

// TODO MARK CATEGORY OF SELECTED SKILL
const FallbackSkillsCategories = observer(props => (
  <div className='fallback-skills-simplified-categories'>
    {props.categories.map(category => (
      <div
        key={'fallback-skills-category-' + category.id}
        className={'fallback-skills-simplified-category' + (props.fallbackSelection.isCategorySelected(category.id) ? ' active' : '')}
        onClick={() => props.fallbackSelection.toggleOrSetSelectCategory(category.id, category.columnId)}>
        {category.title}
      </div>
    ))}
  </div>
))

FallbackSkillsCategories.propTypes = {
  selection: PropTypes.object,
  fallbackSelection: PropTypes.object,
  categories: PropTypes.array
}

export default FallbackSkillsCategories
