'use strict'

import StartpageData from './StartpageData'
import AboutData from './AboutData'
import StoriesData from './StoriesData'
import SkillsData from './SkillsData'
import ContactData from './ContactData'

const StateData = {
  startpage: StartpageData,
  about: AboutData,
  stories: StoriesData,
  skills: SkillsData,
  contact: ContactData
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
