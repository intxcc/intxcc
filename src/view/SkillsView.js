'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import ViewObject from './General/ViewObject'

import ScrollAnchor from './Skills/ScrollAnchor'

import SkillMenu from './Skills/SkillMenu'
import SkillFilter from './Skills/SkillFilter'
import SkillsMap from './Skills/SkillsMap/SkillsMap'
import SkillsDetailView from './Skills/SkillsDetailView'

import StoriesFilter from './Skills/StoriesFilter/StoriesFilter'

const SkillsView = observer((props) => (
  <div className='content-wrapper-inner'>
    <div className='show-help-btn' onClick={props.state.showExplanation}>
      <FontAwesomeIcon icon={'info'} />
    </div>
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
      <div className='stories-overlay-filter-toggle-show-btn' onClick={props.state.storiesFilter.toggleExpand}>
        {props.state.storiesFilter.expand
          ? <FontAwesomeIcon icon={'compress'} />
          : <FontAwesomeIcon icon={'expand'} />}
      </div>
      <StoriesFilter filter={props.state.storiesFilter} />
    </ViewObject>
  </div>
))

SkillsOverlayView.propTypes = {
  global: PropTypes.object,
  state: PropTypes.object,
  view: PropTypes.object
}

export { SkillsView, SkillsOverlayView }
