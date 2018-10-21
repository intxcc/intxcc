'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

import { getNameIdentifierFromSkill } from '../../../miscFunctions'

import MARK_TOOLTIP from '../../../config/MarkTooltips'

const SkillsItemInner = observer((props) => (
  <div className='skills-map-item-inner'>
    {props.skill.desc || props.skill.trivia ? <div title={'with comment'} className='skills-map-item-comment-icon'>
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

@observer
class SkillsMapItemComponent extends React.Component {
  constructor (props) {
    super(props)

    this.isActive = true
  }

  @autobind
  componentWillUnmount () {
    this.isActive = false
  }

  @autobind
  updateSelectedPosition () {
    if (!this.isActive) {
      return
    }

    // Wait for div reference to initialize
    if (!this.div) {
      setTimeout(this.updateSelectedPosition, 0)
      return
    }

    const boundingClientRect = this.div.getBoundingClientRect()
    this.props.centerMapFunc(boundingClientRect.right, boundingClientRect.bottom)
  }

  @autobind
  onClick () {
    // This is important, to recenter the skillItem if the map was moved manually
    this.updateSelectedPosition()
  }

  @autobind
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

const SkillsMapItemLinkWrapper = observer(props => (
  <a className='skills-map-item-link' href={'/#/skills/' + props.skill.id + '-' + getNameIdentifierFromSkill(props.skill)}>
    {props.children}
  </a>
))

SkillsMapItemLinkWrapper.propTypes = {
  skill: PropTypes.object,
  children: PropTypes.object
}

const SkillsMapItem = observer((props) => {
  if (props.selected) {
    return (
      <SkillsMapItemLinkWrapper skill={props.skill}>
        {/* Skill index is only given, because when it changes the component gets rerendered and recentered. E.g. When the filter changes */}
        <SkillsMapItemComponent skillIndex={props.skillIndex} centerMapFunc={props.centerMapFunc} skill={props.skill} />
      </SkillsMapItemLinkWrapper>
    )
  } else {
    return (
      <SkillsMapItemLinkWrapper skill={props.skill}>
        <SkillsMapItemConst skill={props.skill} />
      </SkillsMapItemLinkWrapper>
    )
  }
})

SkillsMapItem.propTypes = {
  skillIndex: PropTypes.number,
  selected: PropTypes.bool,
  centerMapFunc: PropTypes.func,
  skill: PropTypes.object
}

export default SkillsMapItem