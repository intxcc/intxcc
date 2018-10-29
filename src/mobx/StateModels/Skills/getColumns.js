'use strict'

import { SkillsColumns, SkillTitleIndex } from '../../StateData/skills/SkillsColumns'
import { escapeRegExp } from '../../../miscFunctions'

function filterSkill (skill, filter) {
  let markPassed = false

  // /////////// //
  // MARK FILTER //

  const mark = {
    1: filter.options['mark-1'],
    2: filter.options['mark-2'],
    3: filter.options['mark-3']
  }

  let markFilterEnabled = false
  for (let testMark in mark) {
    const markActive = mark[testMark]
    if (markActive) {
      markFilterEnabled = true
      if (parseInt(testMark) === skill.mark) {
        markPassed = true
      }
    }
  }

  if (!markFilterEnabled) {
    // Disable marked filter if no mark is selected
    markPassed = true
  }

  // /////////////// //
  // COMMENT FILTER //

  let withCommentsPassed = true
  if (filter.options['with-comments']) {
    if (!skill.desc) {
      withCommentsPassed = false
    }
  }

  // ///////////// //
  // SEARCH FILTER //

  let searchPassed = true
  if (filter.options['search'] && filter.options['search'].value !== '') {
    searchPassed = false
    const searchString = escapeRegExp(filter.options['search'].value.toLowerCase())
    if (skill.title.toLowerCase().search(searchString) !== -1) {
      searchPassed = true
    }
  }

  // Check all filters
  return (
    markPassed &&
    withCommentsPassed &&
    searchPassed
  )
}

function getColumns (filter) {
  // The skill list has all skill identifiers
  let SkillIdentifierList = []

  // This will show the position of a skill in the SkillIdentifierList
  let SkillIdentifierIndex = {}

  let skillIdentifierListIndex = 0
  for (let column of SkillsColumns) {
    for (let category of column.categories) {
      for (let skill of category.skills) {
        if (!filter || filterSkill(skill, filter)) {
          SkillIdentifierIndex[skill.id] = skillIdentifierListIndex
          SkillIdentifierList.push(skill.id)

          skillIdentifierListIndex++
        }
      }
    }
  }

  return {
    SkillsColumns,
    SkillTitleIndex,
    SkillIdentifierList,
    SkillIdentifierIndex
  }
}

export default getColumns
