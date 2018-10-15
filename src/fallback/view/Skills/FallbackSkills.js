'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import FallbackSkillColumns from './FallbackSkillColumns'
import FallbackSkillsCategories from './FallbackSkillsCategories'
import FallbackSkillsSkills from './FallbackSkillsSkills'

const FallbackSkills = observer(props => {
  let categories = []
  for (let column of props.columns.filter(column => (
    props.state.fallbackSelection.isColumnSelected(column.id) ||
    (props.state.selection.column && props.state.selection.column.id === column.id)
  ))) {
    // If the column is only selected because the skill is selected, just push the category of the selected skill
    let selectedOnlyBecauseSkillIsSelected = null
    if (props.state.selection.column && props.state.selection.column.id === column.id && !props.state.fallbackSelection.isColumnSelected(column.id)) {
      selectedOnlyBecauseSkillIsSelected = props.state.selection.category.id
    }

    for (let category of column.categories) {
      if (selectedOnlyBecauseSkillIsSelected === null) {
        categories.push(category)
      } else if (category.id === selectedOnlyBecauseSkillIsSelected) {
        categories.push(category)
      }
    }
  }

  let skills = []
  for (let category of categories.filter(category => (
    props.state.fallbackSelection.isCategorySelected(category.id) ||
    (props.state.selection.category && props.state.selection.category.id === category.id)
  ))) {
    // If the category is only selected because the skill is selected, just push the category of the selected skill
    let selectedOnlyBecauseSkillIsSelected = null
    if (props.state.selection.category && props.state.selection.category.id === category.id && !props.state.fallbackSelection.isCategorySelected(category.id)) {
      selectedOnlyBecauseSkillIsSelected = props.state.selection.skill.id
    }

    for (let skill of category.skills) {
      if (selectedOnlyBecauseSkillIsSelected === null) {
        skills.push(skill)
      } else if (skill.id === selectedOnlyBecauseSkillIsSelected) {
        skills.push(skill)
      }
    }
  }

  if (props.state.selection.skill) {
    console.log(props.state.selection.skill.id)
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
