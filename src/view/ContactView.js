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
          Github<br />
          Linkedin<br />
          Twitter<br />
          Email
        </div>
        <div className='contact-page-social-symbols'>
          <FontAwesomeIcon icon={['fab', 'github']} /><br />
          <FontAwesomeIcon icon={['fab', 'linkedin']} /><br />
          <FontAwesomeIcon icon={['fab', 'twitter']} /><br />
          <FontAwesomeIcon icon={'envelope-open'} />
        </div>
        <div className='contact-page-social-links'>
          intxcc<br />
          intxcc<br />
          intxcc<br />
          contact@intx.cc
        </div>
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
    <ViewObject object={props.view.objects.get('contact-page-name-display')}>
      contact
      <div className='contact-page-name-display-caption'>
        details
      </div>
    </ViewObject>
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
