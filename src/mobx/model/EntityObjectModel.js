'use strict'

import { types } from 'mobx-state-tree'

import Point from './Point'

const EntityObjectModel = types.model({
  className: types.string,
  pos: Point
})

export default EntityObjectModel
