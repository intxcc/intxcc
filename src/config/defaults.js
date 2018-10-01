'use strict'

import Colors from '../../style/variables/colors.scss'

const ProductionDefaults = {
  White: Colors.white,
  Black: Colors.black,
  PolygonFill: Colors.black,
  PolygonStroke: 'none',
  DefaultStroke: Colors.black,
  DefaultStrokeWidth: 4, // should get multiplied with pixel scale
  DefaultStrokeMiterlimit: '20',
  GuideLength: 2000,
  guideStroke: Colors.black,
  enableStartpageBackgroundVideo: true,
  showAllGuides: true,
  showGuides: false
}

const DevelopmentDefaults = {
  enableStartpageBackgroundVideo: false
}

let isRunningInDevelopmentEnvironment = false
if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
  isRunningInDevelopmentEnvironment = true
}

const Defaults = Object.assign({}, ProductionDefaults, isRunningInDevelopmentEnvironment ? DevelopmentDefaults : {})

export default Defaults
