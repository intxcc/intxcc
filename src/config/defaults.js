'use strict'

import Colors from '../../style/variables/colors.scss'

const ProductionDefaults = {
  White: Colors.white,
  Black: Colors.black,
  PolygonFill: Colors.black,
  PolygonStroke: 'none',
  LogoColor: Colors.logoColor,
  DefaultStroke: Colors.black,
  DefaultStrokeWidth: 4, // should get multiplied with pixel scale
  DefaultStrokeMiterlimit: '20',
  GuideLength: 2000,
  guideStroke: Colors.black,
  enableStartpageBackgroundVideo: true,
  showAllGuides: true,
  showGuides: false,
  showSkillFilterPerDefault: false,
  disableDefaultPopups: false,
  alwaysUseFallback: false,
  neverUseFallback: false
}

const DevelopmentDefaults = {
  enableStartpageBackgroundVideo: false,
  showSkillFilterPerDefault: false,
  disableDefaultPopups: false,
  alwaysUseFallback: true,
  neverUseFallback: false,
  showGuides: false
}

// Here we can choose if in an development environment we want to see the page as it will be in production or with another config for better DX
const EnableDevelopmentDefaultsIfOnLocalhost = true

let isRunningInDevelopmentEnvironment = false
if (EnableDevelopmentDefaultsIfOnLocalhost && (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost')) {
  isRunningInDevelopmentEnvironment = true
}

const Defaults = Object.assign({}, ProductionDefaults, isRunningInDevelopmentEnvironment ? DevelopmentDefaults : {})

export default Defaults
