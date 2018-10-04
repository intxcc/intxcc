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
    path: '/skills',
    model: 'skills'
  },
  {
    path: '/skills/:type(skill)-:id-(.*)',
    model: 'skills'
  },
  {
    path: '/contact',
    model: 'contact'
  },
  {
    path: '/contact/:id',
    model: 'contact'
  }
]

export default RoutingPaths
