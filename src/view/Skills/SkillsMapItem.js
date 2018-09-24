'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

const SkillsMapItemConst = observer((props) => (
  <div className='skills-map-item'>
    {props.title}
  </div>
))

SkillsMapItemConst.propTypes = {
  title: PropTypes.string
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
      <SkillsMapItemConst title={props.title} />
    )
  }
})

SkillsMapItem.propTypes = {
  selected: PropTypes.bool,
  centerMapFunc: PropTypes.func,
  title: PropTypes.string
}

export default SkillsMapItem
