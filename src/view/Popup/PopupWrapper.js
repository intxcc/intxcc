'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import PopupComponent from './PopupComponent'

const PopupWrapper = observer((props) => (
  <div className='popup-wrapper'>
    {props.popups.map((popup, id) => (
      <PopupComponent key={'popup-' + id} title={popup.title} text={popup.text} hint={popup.hint} />
    ))}
  </div>
))

PopupWrapper.propTypes = {
  popups: PropTypes.array
}

export default PopupWrapper
