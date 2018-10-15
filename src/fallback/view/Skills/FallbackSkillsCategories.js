'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

// TODO MARK CATEGORY OF SELECTED SKILL
const FallbackSkillsCategories = observer(props => (
  <div className='fallback-skills-simplified-categories'>
    <h2>Categories</h2>
    {props.categories.map((category, index) => {
      // Check if current item is headline
      if (category.type === 'column-headline') {
        return (
          <h3 key={'fallback-column-headline-' + index}>
            {category.title}
          </h3>
        )
      }

      return (
        <div
          key={'fallback-skills-category-' + category.id}
          className={'fallback-skills-list-item fallback-skills-simplified-category' + (props.fallbackSelection.isCategorySelected(category.id) ? ' active' : '') + (props.selection.category && props.selection.category.id === category.id ? ' selected' : '')}
          onClick={() => props.fallbackSelection.toggleOrSetSelectCategory(category.id, category.columnId)}>
          {category.title}
        </div>
      )
    })}
  </div>
))

FallbackSkillsCategories.propTypes = {
  selection: PropTypes.object,
  fallbackSelection: PropTypes.object,
  categories: PropTypes.array
}

export default FallbackSkillsCategories
