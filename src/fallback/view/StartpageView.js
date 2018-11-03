'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { values } from 'mobx'
import { observer } from 'mobx-react'

import { isEmpty } from '../../miscFunctions'

import Defaults from '../../config/defaults'

import LogoPath from '../../logo/LogoPath'
import FallbackImageAlt from '../../config/FallbackImageAlt'
import BackgroundVideo from '../../view/Startpage/BackgroundVideo'
import LicenseAndImpressumLink from './Components/LicenseAndImpressumLink'

const StartpageView = observer(props => (
  <div className='fallback-view-wrapper startpage-wrapper'>
    <img className='fallback-startpage-background-image' alt={FallbackImageAlt}>
      {/* For screenreaders and the like. */}
    </img>
    <BackgroundVideo isFallback={true} stopped={!isEmpty(values(props.state.basicInfo.popups))} showVideo={Defaults.enableStartpageBackgroundVideo && props.state.showBackgroundVideo} />
    <img alt='Picture of me with triangles.' className='fallback-startpage-pic' src='/fallback_pic.png' />
    <div className='fallback-startpage-headlines'>
      <h1>
        Development and Design by Marvin Alexander Rüll.
      </h1>
      <h2>
        <strong>Hint</strong>: This website was optimized for all modern browsers and screen sizes, but looks better on big screens as they have more room for design.
      </h2>
    </div>
    <LogoPath className={'fallback-logo'} strokeWidth={Defaults.DefaultStrokeWidth / 10} />
    <LicenseAndImpressumLink />
  </div>
))

StartpageView.propTypes = {
  state: PropTypes.object,
  global: PropTypes.object
}

export default StartpageView
