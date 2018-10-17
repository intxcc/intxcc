'use strict'

import React from 'react'
// import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import LicenseAndImpressumLink from './Components/LicenseAndImpressumLink'
import AboutTableComponent from '../../view/About/AboutTableComponent'
import AboutTextComponent from '../../view/About/AboutTextComponent'

const AboutView = observer(props => (
  <div className='fallback-view-wrapper about-wrapper'>
    <AboutTableComponent />
    <AboutTextComponent includeFallbackPicture={true} fallback={true} />
    <LicenseAndImpressumLink />
  </div>
))

// AboutView.propTypes = {
//   global: PropTypes.object
// }

export default AboutView
