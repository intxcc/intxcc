'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

const PopupComponent = observer(props => (
  <div className={'popup ' + props.className}>
    <h1>{props.title}</h1>
    <div className='close-btn-wrapper'>
      <div onClick={props.closeFunc} className='close-btn'>
        <FontAwesomeIcon icon={'times'} />
      </div>
    </div>
    <div className='popup-inner'>
      {props.text}
      {props.hint && props.hint !== '' ? (
        <div className='popup-hint'>
          <i>{props.hint}</i>
        </div>
      ) : ''}
    </div>
  </div>
))

PopupComponent.propTypes = {
  closeFunc: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  hint: PropTypes.string
}

export default PopupComponent
