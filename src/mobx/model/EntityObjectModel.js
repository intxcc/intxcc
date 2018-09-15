'use strict'

import { types } from 'mobx-state-tree'

import Point from './Point'

const EntityObjectModel = types.model({
  className: types.string,
  deg: types.number,
  pos: Point
})

export default EntityObjectModel
