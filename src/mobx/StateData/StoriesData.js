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

const StoriesData = {
  basicInfo: {
    id: 'storiesBasicInfo'
  },
  selectedStory: 'story-pandatrek',
  storiesIndex: storiesIndex,
  stories: stories
}

export default StoriesData
