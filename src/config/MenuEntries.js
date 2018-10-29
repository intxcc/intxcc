'use strict'

const DefaultMenuEntries = [
  {
    name: 'about',
    caption: 'about me'
  }, {
    name: 'stories',
    caption: 'stories'
  }, {
    name: 'skills',
    caption: 'skills'
  }, {
    name: 'contact',
    caption: 'contact'
  }
]

/** The fallback menu gets its own variable, because it has the startpage as an entry and the normal menu does not. */
const FallbackMenuEntries = [
  {
    name: 'startpage',
    caption: 'start'
  }, {
    name: 'about',
    caption: 'about me'
  }, {
    name: 'stories',
    caption: 'stories'
  }, {
    name: 'skills',
    caption: 'skills'
  }, {
    name: 'contact',
    caption: 'contact'
  }
]

export { DefaultMenuEntries, FallbackMenuEntries }
