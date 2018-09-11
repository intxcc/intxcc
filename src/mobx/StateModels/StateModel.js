'use strict'

import { types } from 'mobx-state-tree'

import StoriesModel from './StoriesModel'

const StateModel = types.model({
  stories: StoriesModel
})

export default StateModel
