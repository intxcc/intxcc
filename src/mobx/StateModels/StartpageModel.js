'use strict'

import { types } from 'mobx-state-tree'

import BasicInfoModel from '../model/BasicInfoModel'

const StartpageModel = types.model({
  basicInfo: BasicInfoModel,
  showBackgroundVideo: types.optional(types.boolean, true)
}).actions(self => {
  function setShowBackgroundVideo (showBackgroundVideo) {
    self.showBackgroundVideo = showBackgroundVideo
  }

  return {
    setShowBackgroundVideo
  }
})

export default StartpageModel
