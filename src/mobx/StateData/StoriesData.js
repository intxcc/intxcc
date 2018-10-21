'use strict'

import Pandatrek from './stories/Pandatrek'
import OwnTrack from './stories/OwnTrack'
import PyAudioPortAudio from './stories/PyAudioPortAudio'
import Intxcc from './stories/Intxcc'

const StoriesData = {
  basicInfo: {
    id: 'storiesBasicInfo'
  },
  years: [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008],
  selectedStory: 'story-pandatrek',
  stories: [
    Pandatrek,
    OwnTrack,
    PyAudioPortAudio,
    Intxcc
  ]
}

export default StoriesData
