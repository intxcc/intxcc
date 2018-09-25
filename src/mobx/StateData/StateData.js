'use strict'

import StoriesData from './StoriesData'
import SkillsData from './SkillsData'

const StateData = {
  stories: StoriesData,
  skills: SkillsData
}

// Set map index of popups
for (let i in StateData) {
  const state = StateData[i]
  if (state.basicInfo && state.basicInfo.popups) {
    let popupsMap = {}
    for (let popupIndex in state.basicInfo.popups) {
      const popup = state.basicInfo.popups[popupIndex]
      popupsMap[popup.id] = popup
    }
    StateData[i].basicInfo.popups = popupsMap
  }
}

export default StateData
