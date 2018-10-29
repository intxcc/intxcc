'use strict'

import Colors from '../../../../../style/variables/colors.scss'
import Defaults from '../../../../config/defaults'

// This is the ViewModel of the about view

const VariantModel = {
  guides: {
    // //////// //
    // pink tri //
    'blc0': {
      deg: 9.5,
      vpos: 'top',
      hpos: 'left'
    },
    'blc1': {
      deg: -41.5,
      vpos: 'top',
      hpos: 'right'
    },
    'blc2': {
      deg: 44,
      vpos: 'top',
      hpos: 'left'
    }
  },
  polygons: {
    'AboutPinkTriangle': {
      morphTo: ['PinkTriangle', 'AboutPinkTriangle', 'LeftTriangleA', 'AboutPinkTriangleBackground', 'B', 'D', 'RightTriangleA', 'A', 'C', 'SkillsPolyA'],
      fill: Defaults.White,
      stroke: Colors.primaryColor,
      points: [
        ['blc0', 'blc1'],
        ['blc2', 'blc0'],
        ['blc2', 'blc1']
      ]
    }
  }
}

export default VariantModel
