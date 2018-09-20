'use strict'

import autobind from 'autobind-decorator'

const Routes = {
  '': 'startpage',
  'stories': 'stories',
  'contact': 'contact'
}

/**
 * Defines the router, which is responsible for synchronizing the hash path with the actual application state.
 */
class Router {
  constructor (store) {
    this.store = store

    this.resolvedPathIs404 = false
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
    if (!path0) {
      path0 = ''
    }

    if (!Routes[path0]) {
      this.resolvedPathIs404 = true
      path0 = ''
    } else {
      this.resolvedPathIs404 = false
      // Only save valid hash on every resolve, to get last hash value later
      this.hash = window.location.hash

      this.modelName = Routes[path0]
    }

    // If there is no current model, now, we fall back to the startpage
    if (!this.modelName) {
      this.modelName = Routes[path0]
    }
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
      this.lastModelName = this.modelName
      // The resolve path function changes the hash value, so we need to save the last hash, to rewind to it, if we get a 404
      this.resolvePath()

      // If the path doesn't exist, go to last path
      if (this.resolvedPathIs404) {
        this.revertHash()
        return
      }

      // If the path changed, but is still pointing to the same model no transition is needed
      if (this.lastModelName === this.modelName) {
        return
      }

      if (this.store.viewModels.get(this.modelName)) {
        this.store.startTransition(this.modelName)
      }
    }
  }
}

export default Router
