'use strict'

import { VariablesToPersist } from './persistConfig'
import { save } from './persist'

function persistStateBasicInfo (stateBasicInfo) {
  const stateBasicInfoId = stateBasicInfo.id
  const persistVariables = VariablesToPersist['stateBasicInfo']

  let persistObject = {}
  for (let varName of persistVariables) {
    persistObject[varName] = stateBasicInfo[varName]
  }

  save(stateBasicInfoId, JSON.stringify(persistObject))
}

export default persistStateBasicInfo
