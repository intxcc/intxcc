'use strict'

import Colors from '../../style/variables/colors.scss'
/** Describes very basic but static configuration properties */
const ProductionDefaults = {
  BasicTitle: 'intx.cc | Media Design and Development',
  White: Colors.white,
  Black: Colors.black,
  PolygonFill: Colors.black,
  PolygonStroke: 'none',
  LogoColor: Colors.logoColor,
  DefaultStroke: Colors.black,
  DefaultStrokeWidth: 4, // should get multiplied with pixel scale
  DefaultStrokeMiterlimit: '20',
  GuideLength: 4000,
  guideStroke: Colors.black,
  enableStartpageBackgroundVideo: true,
  showAllGuides: true,
  showGuides: false,
  showSkillFilterPerDefault: false,
  disableDefaultPopups: false,
  alwaysUseFallback: false,
  neverUseFallback: false
}

// Use this if a development environment was detected and it is enabled
const DevelopmentDefaults = {
  enableStartpageBackgroundVideo: false,
  showSkillFilterPerDefault: false,
  disableDefaultPopups: true,
  alwaysUseFallback: false,
  neverUseFallback: false,
  showGuides: false
}

// Here we can choose if in an development environment we want to see the page as it will be in production or with another config for better DX
const EnableDevelopmentDefaultsIfOnLocalhost = false

let isRunningInDevelopmentEnvironment = false
if (EnableDevelopmentDefaultsIfOnLocalhost && (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost')) {
  isRunningInDevelopmentEnvironment = true
}

const Defaults = Object.assign({}, ProductionDefaults, isRunningInDevelopmentEnvironment ? DevelopmentDefaults : {})

export default Defaults
