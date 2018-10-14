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
          'position': 'initial',
          'pointerEvents': 'initial'
        }}>
        {props.children}
      </div>
    )
  } else {
    content = props.children
  }

  let style = {
    'top': props.object.pos.y,
    'left': props.object.pos.x
  }

  // If the rotation div is active set the pointer events only there and not here, to remove areas where the mouse is not working (for the user) for no apparent reason
  if (props.object.deg) {
    style['pointerEvents'] = 'none'
  }

  return (
    <div className={'object ' + props.object.className + ' ' + (props.className ? props.className : '')} style={style}>
      {content}
    </div>
  )
})

ViewObject.propTypes = {
  object: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.object
  ])
}

export default ViewObject
