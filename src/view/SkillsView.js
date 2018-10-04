'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import ViewObject from './General/ViewObject'
import ScrollAnchor from './Skills/ScrollAnchor'
import SkillsMap from './Skills/SkillsMap'
import SkillsDetailView from './Skills/SkillsDetailView'

const SkillsView = observer((props) => (
  <div className='content-wrapper-inner'>
    <SkillsMap state={props.state} columns={props.state.columns} />
    <ViewObject object={props.view.objects.get('stories-overlay-title')}>
      <div className='stories-overlay-title-inner'>
        Stories
      </div>
    </ViewObject>
    <ScrollAnchor state={props.state} />
    {props.state.selection.skill ? <SkillsDetailView selection={props.state.selection} /> : ''}
  </div>
))

SkillsView.propTypes = {
  global: PropTypes.object,
  router: PropTypes.object,
  state: PropTypes.object,
  view: PropTypes.object
}

const SkillsOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
  </div>
))

SkillsOverlayView.propTypes = {
  global: PropTypes.object,
  state: PropTypes.object,
  view: PropTypes.object
}

export { SkillsView, SkillsOverlayView }
