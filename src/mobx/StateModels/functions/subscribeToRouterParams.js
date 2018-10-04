'use static'

import { onPatch } from 'mobx-state-tree'

function onRouterParamPatch (patch, callback) {
  const paramName = patch.path.replace('/', '')
  if (patch.op === 'replace' || patch.op === 'add') {
    const paramValue = patch.value

    callback(paramName, paramValue)
  }

  // TODO CHECK IF THIS IS GOOD. Ignore remove to keep state even if the view model does change
  // if (patch.op === 'remove') {
  //   callback(paramName, '')
  // }
}

function subscribeToRouterParams (params, callback) {
  for (let paramIndex in params.toJSON()) {
    const paramValue = params.get(paramIndex)
    onRouterParamPatch({
      op: 'add',
      path: '/' + paramIndex,
      value: paramValue
    })
  }

  return onPatch(params, patch => {
    onRouterParamPatch(patch, callback)
  })
}

export default subscribeToRouterParams
