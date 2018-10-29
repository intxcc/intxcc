'use strict'

import React from 'react'

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

export default AboutView
