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

    categories.push({
      type: 'column-headline',
      title: column.title
    })

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

    skills.push({
      type: 'category-headline',
      title: category.title
    })

    for (let skill of category.skills) {
      if (selectedOnlyBecauseSkillIsSelected === null && skill.visible) {
        skills.push(skill)
      } else if (skill.id === selectedOnlyBecauseSkillIsSelected) {
        skills.push(skill)
      }
    }
  }

  // If a skill is selected, create a list of all skills in the selected column and categories and notice the fallbackSelection, so we are able to use this data in the SkillsModel to scroll through the skills in the fallback
  if (props.state.selection.skill) {
    let fallbackSelectionSkillList = []
    let indexOfSelectedSkillinSkillList = -1
    for (let skill of skills) {
      if (skill.type) {
        continue
      }

      if (props.state.selection.skill && skill.id === props.state.selection.skill.id) {
        indexOfSelectedSkillinSkillList = fallbackSelectionSkillList.length
      }

      fallbackSelectionSkillList.push(skill)
    }

    // If the selection changed, tell the fallbackSelection state, so we save all selected skills. We need to do this, to be able to scroll through the skills, like we would do in the not-fallback mode1
    if (fallbackSelectionSkillList.length !== props.state.fallbackSelection.selectedSkills.length) {
      // Append setSelectedSkills to the JS event queue
      setTimeout(() => props.state.fallbackSelection.setSelectedSkills(fallbackSelectionSkillList), 0)
    }

    // If the index of the selected skill in the selection changed, tell the state
    if (indexOfSelectedSkillinSkillList !== props.state.fallbackSelection.indexOfSelectedSkillInSelectedSkills) {
      setTimeout(() => props.state.fallbackSelection.setIndexOfSelectedSkillinSkillList(indexOfSelectedSkillinSkillList), 0)
    }
  }

  return (
    <div className='fallback-skills-simplified-overview'>
      <h1>Skill Overview</h1>
      <div className='fallback-skills-simplified-overview-selection-button-wrapper'>
        <div onClick={() => {
          // Select all columns and categories and scroll to skills
          props.state.fallbackSelection.showAll(props.columns)
          setTimeout(() => document.getElementById('fallback-skills-simplified-overview-skills-start-anchor').scrollIntoView({
            behavior: 'smooth'
          }), 100)
        }} className='fallback-skills-simplified-overview-selection-button'>
          Show all
        </div>
        <div onClick={() => {
          // Deselect all columns and categories and scroll to top
          props.state.fallbackSelection.showNone()
          props.state.unSelect()
          setTimeout(() => window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          }), 100)
        }} className='fallback-skills-simplified-overview-selection-button'>
          Clear selection
        </div>
      </div>
      <FallbackSkillColumns columns={props.columns} selection={props.state.selection} fallbackSelection={props.state.fallbackSelection} />
      <FallbackSkillsCategories categories={categories} selection={props.state.selection} fallbackSelection={props.state.fallbackSelection} />
      <FallbackSkillsSkills openSkillDetailsFunc={props.openSkillDetailsFunc} skills={skills} selection={props.state.selection} fallbackSelection={props.state.fallbackSelection} />
    </div>
  )
})

FallbackSkills.propTypes = {
  openSkillDetailsFunc: PropTypes.func,
  state: PropTypes.object,
  columns: PropTypes.object
}

export default FallbackSkills
