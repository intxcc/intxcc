'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import FallbackSkillColumns from './FallbackSkillColumns'
import FallbackSkillsCategories from './FallbackSkillsCategories'
import FallbackSkillsSkills from './FallbackSkillsSkills'

const FallbackSkills = observer(props => {
  let categories = []
  for (let column of props.columns.filter(column => props.state.fallbackSelection.isColumnSelected(column.id))) {
    for (let category of column.categories) {
      categories.push(category)
    }
  }

  let skills = []
  for (let category of categories.filter(category => props.state.fallbackSelection.isCategorySelected(category.id))) {
    for (let skill of category.skills) {
      skills.push(skill)
    }
  }

  return (
    <div className='fallback-skills-simplified-overview'>
      <FallbackSkillColumns columns={props.columns} selection={props.state.selection} fallbackSelection={props.state.fallbackSelection} />
      <FallbackSkillsCategories categories={categories} selection={props.state.selection} fallbackSelection={props.state.fallbackSelection} />
      <FallbackSkillsSkills skills={skills} selection={props.state.selection} fallbackSelection={props.state.fallbackSelection} />
    </div>
  )
})

FallbackSkills.propTypes = {
  state: PropTypes.object,
  columns: PropTypes.object
}

export default FallbackSkills
