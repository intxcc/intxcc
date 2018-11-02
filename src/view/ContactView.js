'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import ViewObject from './General/ViewObject'

const ContactView = observer((props) => (
  <div className='content-wrapper-inner'>
    <ViewObject object={props.view.objects.get('contact-page-social')}>
      <div className='contact-page-social-inner'>
        <div className='contact-page-social-titles'>
          <span className='contact-page-social-title-item'>Github</span><br />
          <span className='contact-page-social-title-item'>Linkedin</span><br />
          <span className='contact-page-social-title-item'>Twitter</span><br />
          <span className='contact-page-social-title-item'>Email</span>
        </div>
        <div className='contact-page-social-symbols'>
          <FontAwesomeIcon icon={['fab', 'github']} /><br />
          <FontAwesomeIcon icon={['fab', 'linkedin']} /><br />
          <FontAwesomeIcon icon={['fab', 'twitter']} /><br />
          <FontAwesomeIcon icon={'envelope-open'} />
        </div>
        <div className='contact-page-social-links'>
          <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc'>intxcc</a><br />
          <a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/intxcc/'>intxcc</a><br />
          <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/intxcc'>intxcc</a><br />
          <a target='_blank' rel='noopener noreferrer' href='mailto:contact@intx.cc'>contact@intx.cc</a> <a target='_blank' rel='noopener noreferrer' href='https://intx.cc/public/contact[at]intx.cc_contact[at]marvinruell.de_public_key.asc'>pgp</a>
        </div>
      </div>
    </ViewObject>
    <ViewObject object={props.view.objects.get('contact-page-name-display')}>
      contact
      <div className='contact-page-name-display-caption'>
        details
      </div>
    </ViewObject>
  </div>
))

ContactView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

const ContactOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
    <ViewObject object={props.view.objects.get('contact-page-impressum')}>
      <div className='contact-page-impressum-inner'>
        <h2>
          Marvin Alexander Rüll<br />
          Abtstr. 4<br />
          12489 Berlin
        </h2>
        <h1>
          Angaben gemäß §5 TMG
        </h1>
      </div>
    </ViewObject>
  </div>
))

ContactOverlayView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export { ContactView, ContactOverlayView }
