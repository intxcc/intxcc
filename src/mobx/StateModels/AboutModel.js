'use strict'

import { types } from 'mobx-state-tree'

import { BasicInfoModel } from '../model/ViewEntity'

const AboutModel = types.model({
  basicInfo: BasicInfoModel
})

export default AboutModel
