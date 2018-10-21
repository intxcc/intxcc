'use strict'

/**
 * Basic types:
 * model - Name of the viewmodel for main
 * modelVariant - Name of the viewmodel variant
 * ... other variables
*/

const RoutingPaths = [
  {
    path: '',
    model: 'startpage'
  },
  {
    path: '/about',
    model: 'about'
  },
  {
    path: '/stories',
    model: 'stories'
  },
  {
    path: '/stories/:type(story)-:story_name',
    model: 'stories'
  },
  {
    path: '/skills',
    model: 'skills'
  },
  {
    path: '/skills/:type(skill)-:skill_id-(.*)',
    model: 'skills'
  },
  {
    path: '/skills/:type(skill)/:skill_name',
    model: 'skills'
  },
  {
    path: '/contact',
    model: 'contact'
  }
]

export default RoutingPaths
