'use strict'

import Colors from '../../style/variables/colors.scss'

const Defaults = {
  White: Colors.white,
  Black: Colors.black,
  PolygonFill: Colors.black,
  PolygonStroke: 'none',
  DefaultStroke: Colors.black,
  DefaultStrokeWidth: 4, // should get multiplied with pixel scale
  DefaultStrokeMiterlimit: '20',
  GuideLength: 2000,
  guideStroke: Colors.black,
  showAllGuides: true,
  showGuides: true
}

export default Defaults
