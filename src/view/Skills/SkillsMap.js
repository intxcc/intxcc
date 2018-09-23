'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import PointerLock from '../Components/PointerLock'

import SkillsMapColumn from './SkillsMapColumn'
import SkillsMapCategory from './SkillsMapCategory'
import SkillsMapItem from './SkillsMapItem'

const SkillsMap = observer((props) => (
  <div className='skills-map-outer-wrapper'>
    <div className='skills-map-wrapper' style={{
      'transform': 'translate3d(-50%, -50%, 0) rotate(30deg) translate3d(' + props.state.mapPosition.x + 'px,' + props.state.mapPosition.y + 'px, 0)'
    }}>
      {props.columns.map(column => (
        <SkillsMapColumn
          key={'skills-column-' + column.id}
          selected={column.id === props.state.selection.column}
          title={column.title}>
          {column.categories.map(category => (
            <SkillsMapCategory
              key={'skills-category-' + category.id}
              selected={category.id === props.state.selection.category}
              title={category.title}>
              {category.skills.map(skill => (
                <SkillsMapItem
                  key={'skills-item-' + skill.id}
                  selected={skill.id === props.state.selection.skill}
                  title={skill.title} />
              ))}
            </SkillsMapCategory>
          ))}
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
