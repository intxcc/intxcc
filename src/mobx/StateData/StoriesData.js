'use strict'

import Pandatrek from './stories/Pandatrek'
import Thehackcamporg from './stories/Thehackcamporg'
import OwnTrack from './stories/OwnTrack'
import PyAudioPortAudio from './stories/PyAudioPortAudio'
import E4parteieu from './stories/E4parteieu'
import Intxcc from './stories/Intxcc'

const stories = [
  Pandatrek,
  Thehackcamporg,
  OwnTrack,
  PyAudioPortAudio,
  E4parteieu,
  Intxcc
]

let storiesIndex = {}
let yearMap = {}
for (let storyIndex in stories) {
  const story = stories[storyIndex]
  if (!yearMap[story.year]) {
    yearMap[story.year] = []
  }
  yearMap[story.year].push(story.id)
  storiesIndex[story.id] = storyIndex
}

let years = []
for (let year in yearMap) {
  years.push({
    year: parseInt(year),
    stories: yearMap[year].reverse()
  })
}
years = years.reverse()

const StoriesData = {
  id: 'storiesState',
  basicInfo: {
    id: 'storiesBasicInfo'
  },
  years: years,
  selectedStory: 'story-pandatrek',
  storiesIndex: storiesIndex,
  stories: stories
}

export default StoriesData
