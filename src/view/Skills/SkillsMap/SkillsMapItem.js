'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react'

import { getNameIdentifierFromSkill } from '../../../miscFunctions'

import MARK_TOOLTIP from '../../../config/MarkTooltips'

/** Descibes how a single skill is rendered.
 * If the skill is selected we render it as a component, so when this component is mounted, we get a callback and can center the selected skill.
 * If the skill is not selected use an arrow function to describe the skill, for performance reasons.
 */

const SkillsItemInner = observer((props) => (
  <div className='skills-map-item-inner'>
    {props.skill.desc ? <div title={'with comment'} className='skills-map-item-comment-icon'>
      <FontAwesomeIcon icon={['far', 'comment-dots']} />
    </div> : ''}
    {props.skill.mark <= 0 ? '' : (
      <div title={MARK_TOOLTIP[props.skill.mark]} className='skills-map-item-mark' style={{
        'opacity': ((props.skill.mark + 0.5) / 3.5)
      }}>
        {props.skill.mark}
      </div>
    )}
    {props.skill.title}
  </div>
))

SkillsItemInner.propTypes = {
  skill: PropTypes.object
}

const SkillsMapItemConst = observer((props) => (
  <div className='skills-map-item'>
    <SkillsItemInner skill={props.skill} />
  </div>
))

SkillsMapItemConst.propTypes = {
  skill: PropTypes.object
}

// This component is used for selected skills
@observer
class SkillsMapItemComponent extends React.Component {
  constructor (props) {
    super(props)

    this.isActive = true

    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.updateSelectedPosition = this.updateSelectedPosition.bind(this)
    this.onClick = this.onClick.bind(this)
    this.render = this.render.bind(this)
  }

  // Set isActive to false, so the callback from a timout knows to not do anything anymore, so react won't throw errors
  componentWillUnmount () {
    this.isActive = false
  }

  updateSelectedPosition () {
    // If component did already unmount, do nothing
    if (!this.isActive) {
      return
    }

    // Wait for div reference to initialize
    if (!this.div) {
      setTimeout(this.updateSelectedPosition, 0)
      return
    }

    // Center the skill on the skill map
    const boundingClientRect = this.div.getBoundingClientRect()
    this.props.centerMapFunc(boundingClientRect.right, boundingClientRect.bottom)
  }

  onClick () {
    // This is important, to recenter the skillItem if the map was moved manually
    this.updateSelectedPosition()
  }

  render () {
    setTimeout(this.updateSelectedPosition, 0)

    return (
      <div ref={div => { this.div = div }} className='skills-map-item item-selected'>
        <SkillsItemInner skill={this.props.skill} />
      </div>
    )
  }
}

SkillsMapItemComponent.propTypes = {
  skill: PropTypes.object,
  centerMapFunc: PropTypes.func
}

// Just a link wrapper, so we do not have to have redundant code
const SkillsMapItemLinkWrapper = observer(props => {
  if (props.useSelectCallback && typeof props.useSelectCallback === 'function') {
    return (
      <span onClick={() => props.useSelectCallback(props.skill)}>
        {props.children}
      </span>
    )
  }

  return (
    <a className='skills-map-item-link' href={'/#/skills/' + props.skill.id + '-' + getNameIdentifierFromSkill(props.skill)}>
      {props.children}
    </a>
  )
})

SkillsMapItemLinkWrapper.propTypes = {
  useSelectCallback: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  skill: PropTypes.object,
  children: PropTypes.object
}

// The actual Component used by the skill category to render skills, it decides wether to use a Component with onMount functions or arrow functions
const SkillsMapItem = observer((props) => {
  if (props.selected) {
    return (
      <SkillsMapItemLinkWrapper useSelectCallback={props.useSelectCallback} skill={props.skill}>
        {/* Skill index is only given, because when it changes the component gets rerendered and recentered. E.g. When the filter changes */}
        <SkillsMapItemComponent skillIndex={props.skillIndex} centerMapFunc={props.centerMapFunc} skill={props.skill} />
      </SkillsMapItemLinkWrapper>
    )
  } else {
    return (
      <SkillsMapItemLinkWrapper useSelectCallback={props.useSelectCallback} skill={props.skill}>
        <SkillsMapItemConst skill={props.skill} />
      </SkillsMapItemLinkWrapper>
    )
  }
})

SkillsMapItem.propTypes = {
  useSelectCallback: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  skillIndex: PropTypes.number,
  selected: PropTypes.bool,
  centerMapFunc: PropTypes.func,
  skill: PropTypes.object
}

export default SkillsMapItem
