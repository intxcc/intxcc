'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

const SkillsItemInner = observer((props) => (
  <div className='skills-map-item-inner'>
    {props.skill.desc ? <div className='skills-map-item-comment-icon'>
      <FontAwesomeIcon icon={['far', 'comment-dots']} />
    </div> : ''}
    {props.skill.mark <= 0 ? '' : (
      <div className='skills-map-item-mark' style={{
        'opacity': ((props.skill.mark + 0.5) / 3.5)
      }}>
        {props.skill.mark}
      </div>
    )}
    {props.skill.title}
  </div>
))

SkillsItemInner.propTypes = {
  skill: PropTypes.object,
  onSkillClick: PropTypes.func
}

const SkillsMapItemConst = observer((props) => (
  <div onClick={() => {
    props.onSkillClick(props.skill.id)
  }} className='skills-map-item'>
    <SkillsItemInner skill={props.skill} />
  </div>
))

SkillsMapItemConst.propTypes = {
  skill: PropTypes.object,
  onSkillClick: PropTypes.func
}

@observer
class SkillsMapItemComponent extends React.Component {
  @autobind
  updateSelectedPosition () {
    // Wait for div reference to initialize
    if (!this.div) {
      setTimeout(this.updateSelectedPosition, 10)
      return
    }

    const boundingClientRect = this.div.getBoundingClientRect()
    this.props.centerMapFunc(boundingClientRect.right, boundingClientRect.bottom)
  }

  @autobind
  onClick () {
    this.updateSelectedPosition()
    this.props.onSkillClick(this.props.skill.id)
  }

  @autobind
  render () {
    setTimeout(this.updateSelectedPosition, 0)

    return (
      <div ref={div => { this.div = div }} onClick={this.onClick} className='skills-map-item item-selected'>
        <SkillsItemInner skill={this.props.skill} />
      </div>
    )
  }
}

SkillsMapItemComponent.propTypes = {
  skill: PropTypes.object,
  onSkillClick: PropTypes.func,
  centerMapFunc: PropTypes.func
}

const SkillsMapItem = observer((props) => {
  if (props.selected) {
    return (
      <SkillsMapItemComponent centerMapFunc={props.centerMapFunc} onSkillClick={props.onSkillClick} skill={props.skill} />
    )
  } else {
    return (
      <SkillsMapItemConst onSkillClick={props.onSkillClick} skill={props.skill} />
    )
  }
})

SkillsMapItem.propTypes = {
  selected: PropTypes.bool,
  centerMapFunc: PropTypes.func,
  onSkillClick: PropTypes.func,
  skill: PropTypes.object
}

export default SkillsMapItem
