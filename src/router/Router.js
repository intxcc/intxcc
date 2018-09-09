'use strict'

import autobind from 'autobind-decorator'

/**
 * Defines the router, which is responsible for synchronizing the hash path with the actual application state.
 */
class Router {
  constructor (store) {
    this.store = store
    setTimeout(this.onHashChange, 0)
  }

  @autobind
  onHashChange () {
    let hash = window.location.hash
    hash = hash.split('/')

    let path = []
    for (let hashPart of hash) {
      if (hashPart === '' || hashPart === '#') {
        continue
      }

      path.push(hashPart)
    }

    if (this.store.viewModels.get(path[0])) {
      this.store.updateViewEntity('main', path[0])
    }
  }
}

export default Router
