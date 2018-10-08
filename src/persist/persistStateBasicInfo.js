'use strict'

import { VariablesToPersist } from './persistConfig'

function persistStateBasicInfo (stateBasicInfo) {
  const stateBasicInfoId = stateBasicInfo.id
  const persistVariables = VariablesToPersist['stateBasicInfo']
  for (let varName of persistVariables) {
    console.log(stateBasicInfo[varName])
  }
}

export default persistStateBasicInfo
