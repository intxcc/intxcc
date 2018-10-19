'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import ViewObject from './General/ViewObject'
import ScrollAnchor from './Skills/ScrollAnchor'
import SkillMenu from './Skills/SkillMenu'
import SkillFilter from './Skills/SkillFilter'
import SkillsMap from './Skills/SkillsMap'
import SkillsDetailView from './Skills/SkillsDetailView'

const SkillsView = observer((props) => (
  <div className='content-wrapper-inner'>
    <SkillsMap state={props.state} columns={props.state.columns} />
    <SkillMenu state={props.state} />
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
  state: PropTypes.object,
  view: PropTypes.object
}

const SkillsOverlayView = observer((props) => (
  <div className='overlay-wrapper-inner'>
    <SkillFilter showSkillFilter={props.state.showSkillFilter} state={props.state} />
    <ViewObject object={props.view.objects.get('stories-overlay-inner')}>
      <div className='stories-overlay-inner-wrapper'>
        hello
      </div>
    </ViewObject>
  </div>
))

SkillsOverlayView.propTypes = {
  global: PropTypes.object,
  state: PropTypes.object,
  view: PropTypes.object
}

export { SkillsView, SkillsOverlayView }
