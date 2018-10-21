'use strict'

import Pandatrek from './stories/Pandatrek'
import OwnTrack from './stories/OwnTrack'
import PyAudioPortAudio from './stories/PyAudioPortAudio'
import Intxcc from './stories/Intxcc'

const stories = [
  Pandatrek,
  OwnTrack,
  PyAudioPortAudio,
  Intxcc
]

let storiesIndex = {}
let yearMap = {}
for (let storyIndex in stories) {
  const story = stories[storyIndex]
  yearMap[story.year] = ''
  storiesIndex[story.id] = storyIndex
}

let years = []
for (let year in yearMap) {
  years.push(parseInt(year))
}
years = years.reverse()

const StoriesData = {
  basicInfo: {
    id: 'storiesBasicInfo'
  },
  years: years,
  selectedStory: 'story-pandatrek',
  storiesIndex: storiesIndex,
  stories: stories
}

export default StoriesData
