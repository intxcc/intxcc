'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import ViewObject from './General/ViewObject'

const ContactView = observer((props) => (
  <div className='content-wrapper-inner'>
    Test
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
  </div>
))

ContactOverlayView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export { ContactView, ContactOverlayView }
