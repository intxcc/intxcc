'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import { escapeRegExp } from '../../miscFunctions'

const linkStart = '[Link'
const linkDelimiter = '|'
const linkEnd = ']'

function createLink (linkString, linkKey) {
  const linkArray = linkString.split(linkDelimiter)
  const linkType = linkArray[0]
  const linkData = linkArray.slice(1)

  switch (linkType.toLowerCase()) {
    case 'skill':
      const skillName = linkData[0]

      if (!skillName) {
        break
      }

      return (
        <a key={linkKey} href={'/#/skills/skill/' + skillName.toLowerCase()}>
          {skillName}
        </a>
      )
    case 'extern':
      const linkName = linkData[0]
      const linkUrl = linkData[1]

      if (!linkName || !linkUrl) {
        break
      }

      return (
        <a key={linkKey} target='_blank' rel='noopener noreferrer' href={linkUrl}>
          {linkName}
        </a>
      )
  }

  // If no link matched, return empty
  return ''
}

/** Replaces links in e.g. the description or trivia of a skill */
function replaceLinks (string) {
  let parts = []

  let findResult = string.search(escapeRegExp(linkStart))
  let lastEndPos = 0

  // While links are in the rest of the string
  while (findResult >= 0) {
    // Get last found position plus length of the linkStart to jump to the start of the linkString
    const curPos = findResult + linkStart.length
    // Search for the linkEnd in the string after the current position
    const endPos = string.substr(curPos).search(escapeRegExp(linkEnd))

    // If we have a start and end, push the string from 0 or the last link to the start of the newlink to parts and give the linkString to createLink to make sense of the linkString
    if (curPos && endPos) {
      parts.push(string.substr(lastEndPos, findResult - lastEndPos))
      const linkString = string.substr(curPos + 1, endPos - 1)
      // Unique link key for react
      const linkKey = parts[parts.length - 1] + '-link-' + linkString.toLowerCase()
      parts.push(createLink(linkString, linkKey))
    }

    // Save the position of the end of the current link to know where this string ended in the next loop
    lastEndPos = curPos + endPos + 1

    // Search for the next link after the end of this one, if we can't find one, break
    const lastFindResultPlusOne = findResult + 1
    findResult = string.substr(lastFindResultPlusOne).search(escapeRegExp(linkStart))
    if (findResult < 0) {
      break
    }

    // lastFindResultPlus one gets added, because it has only the number of letters between the last and next link, but we need to save the absolute position
    findResult += lastFindResultPlusOne
  }

  // Push everything not already in the parts to the parts
  parts.push(string.substr(lastEndPos))

  return parts
}

const LinkReplaceComponent = observer(props => {
  return replaceLinks(props.text)
})

LinkReplaceComponent.propTypes = {
  text: PropTypes.string
}

export default LinkReplaceComponent
