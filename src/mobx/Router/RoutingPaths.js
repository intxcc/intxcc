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
    title: 'startpage',
    model: 'startpage'
  },
  {
    path: '/about',
    title: 'about me',
    model: 'about'
  },
  {
    path: '/stories',
    title: 'stories',
    model: 'stories'
  },
  {
    path: '/stories/:type(story)-:story_name',
    title: '',
    model: 'stories'
  },
  {
    path: '/skills',
    title: 'skills',
    model: 'skills'
  },
  {
    path: '/skills/:type(skill)-:skill_id-(.*)',
    title: '',
    model: 'skills'
  },
  {
    path: '/skills/:type(skill)/:skill_name',
    title: '',
    model: 'skills'
  },
  {
    path: '/contact',
    title: 'contact',
    model: 'contact'
  }
]

export default RoutingPaths
