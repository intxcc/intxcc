'use strict'

import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import LicenseAndImpressumLink from './Components/LicenseAndImpressumLink'

const ContactView = observer(props => (
  <div className='fallback-view-wrapper contact-wrapper'>
    <div className='fallback-contact-wrapper-inner'>
      <h2>Contact me on Social Media</h2>
      <div className='fallback-contact-page-social-inner'>
        <div className='contact-page-social-titles'>
          <span className='contact-page-social-title-item'>Github</span><br />
          <span className='contact-page-social-title-item'>Linkedin</span><br />
          <span className='contact-page-social-title-item'>Twitter</span><br />
          <span className='contact-page-social-title-item'>Email</span>
        </div>
        <div className='contact-page-social-symbols'>
          <span><FontAwesomeIcon icon={['fab', 'github']} /></span><br />
          <span><FontAwesomeIcon icon={['fab', 'linkedin']} /></span><br />
          <span><FontAwesomeIcon icon={['fab', 'twitter']} /></span><br />
          <span><FontAwesomeIcon icon={'envelope-open'} /></span>
        </div>
        <div className='contact-page-social-links'>
          <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc'>intxcc</a><br />
          <a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/intxcc/'>intxcc</a><br />
          <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/intxcc'>intxcc</a><br />
          <a target='_blank' rel='noopener noreferrer' href='mailto:contact@intx.cc'>contact@intx.cc</a> <a target='_blank' rel='noopener noreferrer' href='https://intx.cc/public/public.asc'>pgp</a>
        </div>
      </div>
      <div className='contact-page-impressum'>
        <h2>Angaben gemäß §5 TMG | Impressum to conform to german law</h2>
        <p className='contact-page-impressum-content'>
          Marvin Alexander Rüll<br />
          Abtstr. 4<br />
          12489 Berlin
        </p>
      </div>
    </div>
    <LicenseAndImpressumLink />
  </div>
))

export default ContactView
