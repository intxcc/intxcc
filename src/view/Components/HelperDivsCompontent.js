'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { keys } from 'mobx'

const HelperDivsComponent = observer((props) => {
  return keys(props.guides).map((key) => (
    <div
      ref={ (helperDiv) => { props.that.helperDivs[key] = helperDiv }}
      key={props.className + '-' + props.modelName + '-helper-div-' + key}
      className={'guide guide-' + key}>
    </div>
  ))
})

HelperDivsComponent.propTypes = {
  modelName: PropTypes.string,
  className: PropTypes.string,
  guides: PropTypes.object,
  that: PropTypes.object
}

export default HelperDivsComponent
