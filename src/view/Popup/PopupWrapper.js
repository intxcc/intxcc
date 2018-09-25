'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { values } from 'mobx'

import PopupComponent from './PopupComponent'

const PopupWrapper = observer((props) => (
  <div className='popup-wrapper'>
  aduihadui
    {values(props.popups).map(popup => (
      <PopupComponent key={popup.id} closeFunc={() => props.closeFunc(popup.id)} className={popup.className} title={popup.title} text={popup.text} hint={popup.hint} />
    ))}
  </div>
))

PopupWrapper.propTypes = {
  popups: PropTypes.object,
  closeFunc: PropTypes.func
}

export default PopupWrapper
