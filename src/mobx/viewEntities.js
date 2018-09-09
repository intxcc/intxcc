'use strict'

import ViewEntity from './model/ViewEntity'

/**
 * Describes the three views.
 * @main - The view currently visible
 * @buffer - The view we are transitioning to. Preload this so we can show it after the transition of the model in the MainView to the new model is finished.
 * @overlay - A second view we can use to get a picture-in-picture-like-function
 */
const viewEntities = {
  main: ViewEntity.create({
    model: ''
  }),
  buffer: ViewEntity.create({
    model: ''
  }),
  overlay: ViewEntity.create({
    model: ''
  })
}

export default viewEntities
