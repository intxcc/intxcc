'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import SkillsMapZoom from './SkillsMapZoom'
import SkillsMapColumns from './SkillsMapColumns'

const SkillsMap = observer((props) => (
  <div onMouseDown={props.state.onMouseDown}
    onMouseUp={props.state.onMouseUp}
    onMouseMove={props.state.onMouseMove}
    onTouchStart={props.state.onMouseDown}
    onTouchEnd={props.state.onMouseUp}
    onTouchMove={props.state.onMouseMove}
    onWheel={(e) => {
      const n = e.deltaY > 0 ? 1 : -1
      props.state.scrollSkill(n, e)
    }}
    className={'skills-map-outer-wrapper' + (props.state.storiesFilter.addSkillMode ? ' add-skill-mode' : '')}>
    <SkillsMapZoom changeMapScaleFunc={props.state.changeMapScale} />
    <div className={'skills-map-wrapper' + ((props.state.transitionOn ? ' transition' : '')) + (!props.state.mouseDragEnabled ? ' no-drag' : '')}
      style={{
        'transform': 'translate3d(-50%, -50%, 0) translate3d(' + props.state.mapPosition.x + 'px,' + props.state.mapPosition.y + 'px, 0) scale(' + props.state.mapScale + ') rotate(30deg)'
      }}>
      <SkillsMapColumns selected={props.state.selection} useSelectCallback={props.state.storiesFilter.addSkillMode ? props.state.storiesFilter.addSkill : false} centerMapFunc={props.state.centerMap} columns={props.columns} />
    </div>
  </div>
))

SkillsMap.propTypes = {
  state: PropTypes.object,
  columns: PropTypes.object
}

export default SkillsMap
