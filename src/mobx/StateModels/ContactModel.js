'use strict'

import { types } from 'mobx-state-tree'

import BasicInfoModel from '../model/BasicInfoModel'

const ContactModel = types.model({
  basicInfo: BasicInfoModel
})

export default ContactModel
