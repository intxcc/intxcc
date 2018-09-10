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

    // Save hash on every resolve, to get last hash value later
    this.hash = window.location.hash

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
  revertHash () {
    window.location.hash = this.hash
    this.ignoreNextHashChange = true
  }

  @autobind
  onHashChange () {
    // A flag for ignoring one hash change, e.g. for reverting the hash
    if (this.ignoreNextHashChange) {
      this.ignoreNextHashChange = false
      return
    }

    if (this.store.isTransitioning) {
      this.revertHash()
    } else {
      this.resolvePath()

      if (this.store.viewModels.get(this.modelName)) {
        this.store.startTransition(this.modelName)
      }
    }
  }
}

export default Router
