'use strict'

import ViewEntity from './model/ViewEntity'

const viewEntities = {
  main: ViewEntity.create({
    model: 'startpage'
  }),
  buffer: ViewEntity.create({
    model: ''
  }),
  overlay: ViewEntity.create({
    model: ''
  })
}

export default viewEntities
