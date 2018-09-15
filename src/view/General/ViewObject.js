'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const ViewObject = observer((props) => {
  if (!props.object) {
    return ''
  }

  let content
  if (props.object.deg) {
    content = (
      <div
        className={'rotation-div ' + props.object.className + ' ' + (props.className ? props.className : '')}
        style={{
          'transform': 'rotate(' + props.object.deg + 'deg)',
          'position': 'initial'
        }}>
        {props.children}
      </div>
    )
  } else {
    content = props.children
  }

  return (
    <div className={'object ' + props.object.className + ' ' + (props.className ? props.className : '')} style={{
      'top': props.object.pos.y,
      'left': props.object.pos.x
    }}>
      {content}
    </div>
  )
})

ViewObject.propTypes = {
  object: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
}

export default ViewObject
