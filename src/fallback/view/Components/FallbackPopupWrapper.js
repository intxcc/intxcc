'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import PopupWrapper from '../../../view/Popup/PopupWrapper'

const FallbackPopupWrapper = observer(props => {
  if (typeof props.states[props.activePage] === 'undefined') {
    return ''
  }

  return (
    <PopupWrapper closeFunc={props.states[props.activePage].basicInfo.closePopup} popups={props.states[props.activePage].basicInfo.popups} />
  )
})

FallbackPopupWrapper.propTypes = {
  states: PropTypes.object,
  activePage: PropTypes.string
}

export default FallbackPopupWrapper
