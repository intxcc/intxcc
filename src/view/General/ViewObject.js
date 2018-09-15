'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const ViewObject = observer((props) => {
  if (!props.object) {
    return ''
  }

  return (
    <div className={'object ' + props.object.className + ' ' + (props.className ? props.className : '')} style={{
      'top': props.object.pos.y,
      'left': props.object.pos.x
    }}>
      {props.children}
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
