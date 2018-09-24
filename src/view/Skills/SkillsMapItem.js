'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

import Style from '../../../style/variables/global.scss'

const SkillsMapItemConst = observer((props) => (
  <div onClick={() => {
    props.onSkillClick(props.id)
  }} className='skills-map-item'>
    {props.title}
  </div>
))

SkillsMapItemConst.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
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
  render () {
    setTimeout(this.updateSelectedPosition, 0)
    setTimeout(this.updateSelectedPosition, Style.skillsMapTransitionTime)

    return (
      <div ref={div => { this.div = div }} className='skills-map-item item-selected'>
        {this.props.title}
      </div>
    )
  }
}

SkillsMapItemComponent.propTypes = {
  centerMapFunc: PropTypes.func,
  title: PropTypes.string
}

const SkillsMapItem = observer((props) => {
  if (props.selected) {
    return (
      <SkillsMapItemComponent centerMapFunc={props.centerMapFunc} title={props.title} />
    )
  } else {
    return (
      <SkillsMapItemConst onSkillClick={props.onSkillClick} id={props.id} title={props.title} />
    )
  }
})

SkillsMapItem.propTypes = {
  selected: PropTypes.bool,
  centerMapFunc: PropTypes.func,
  onSkillClick: PropTypes.func,
  id: PropTypes.string,
  title: PropTypes.string
}

export default SkillsMapItem
