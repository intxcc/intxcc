'use strict'

import autobind from 'autobind-decorator'

/**
 * Defines the router, which is responsible for synchronizing the hash path with the actual application state.
 */
class Router {
  constructor (store) {
    this.store = store

    this.resolvePath()

    this.store.updateViewEntity('main', this.path[0])
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
  }

  @autobind
  onHashChange () {
    this.resolvePath()

    if (this.store.viewModels.get(this.path[0])) {
      this.store.startTransition(this.path[0])
    }
  }
}

export default Router
