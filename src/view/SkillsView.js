'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import ViewObject from './General/ViewObject'

const SkillsView = observer((props) => (
  <div className='content-wrapper-inner'>
    <ViewObject object={props.view.objects.get('stories-overlay-title')}>
      <div className='stories-overlay-title-inner'>
        Stories
      </div>
    </ViewObject>
  </div>
))

SkillsView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

const SkillsOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
    aa
  </div>
))

SkillsOverlayView.propTypes = {
  global: PropTypes.object,
  view: PropTypes.object
}

export { SkillsView, SkillsOverlayView }
