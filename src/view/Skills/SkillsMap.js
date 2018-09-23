'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import PointerLock from '../Components/PointerLock'

import SkillsMapColumn from './SkillsMapColumn'

const SkillsMap = observer((props) => (
  <div className='skills-map-outer-wrapper'>
    <div
      onWheel={(e) => {
        const n = e.deltaY > 0 ? 1 : -1
        props.state.scrollSkill(n)
      }}
      className='skills-map-wrapper'
      style={{
        'transform': 'translate3d(-50%, -50%, 0) rotate(30deg) translate3d(' + props.state.mapPosition.x + 'px,' + props.state.mapPosition.y + 'px, 0)'
      }}>
      {props.columns.map(column => (
        <SkillsMapColumn
          key={'skills-' + column.id}
          selected={props.state.selection.column && props.state.selection.column.id === column.id ? props.state.selection : false}
          title={column.title}
          categories={column.categories}>
        </SkillsMapColumn>
      ))}
    </div>
    <div className='skills-map-scroll-anchor'>
      <div className='skills-map-scroll-anchor-symbol'>
        <FontAwesomeIcon icon={'arrows-alt'} />
      </div>
      <div className='skills-map-scroll-anchor-caption'>
        move
      </div>
      <PointerLock onMovement={props.state.moveMapBy} className='pointer-lock-canvas' />
    </div>
  </div>
))

SkillsMap.propTypes = {
  state: PropTypes.object,
  columns: PropTypes.array
}

export default SkillsMap
