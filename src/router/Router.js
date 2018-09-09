'use strict'

import autobind from 'autobind-decorator'

const Routes = {
  '': 'startpage',
  'stories': 'stories'
}

/**
 * Defines the router, which is responsible for synchronizing the hash path with the actual application state.
 */
class Router {
  constructor (store) {
    this.store = store

    this.resolvePath()

    this.store.updateViewEntity('main', this.modelName)
  }

  @autobind
  resolvePath () {
    let hash = window.location.hash
    hash = hash.split('/')

    this.path = []
    for (let hashPart of hash) {
      if (hashPart === '' || hashPart === '#') {
        continue
      }

      this.path.push(hashPart)
    }

    let path0 = this.path[0]
    if (!Routes[path0]) {
      path0 = ''
    }

    this.modelName = Routes[path0]
  }

  @autobind
  onHashChange () {
    this.resolvePath()

    if (this.store.viewModels.get(this.modelName)) {
      this.store.startTransition(this.modelName)
    }
  }
}

export default Router
