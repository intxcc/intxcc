'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

/** Describes the popup on the startpage. It is not persistent. */
const StartPopup = observer(props => (
  <div className='popup start-popup'>
    <h2>
      <span>this is intxcc</span><br />
      <span>this is future</span><br />
      <span>this is warm summer rain</span><br />
      <span className='start-popup-for-you-span'>This is for you.</span>
    </h2>
    <h1>This is development, design &amp; art from Berlin.</h1>
    <div className='start-popup-btn-wrapper'>
      <div onClick={props.closeFunc} className='start-popup-btn btn-1'>
        Continue to start
      </div>
      <div onClick={props.closeFunc} className='start-popup-btn btn-2'>
        I hate summer rain.
      </div>
    </div>
  </div>
))

StartPopup.propTypes = {
  closeFunc: PropTypes.func,
  popup: PropTypes.object
}

export default StartPopup
