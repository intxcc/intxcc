'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const StartPopup = observer(props => (
  <div className='popup start-popup'>
    <h2>
      <span>this is intxcc</span><br />
      <span>this is future</span><br />
      <span>this is freedom</span><br />
      <span>this is warm summer rain</span><br />
      <span className='start-popup-for-you-span'>This is for you.</span>
    </h2>
    <h1>This is development, design &amp; art from Berlin.</h1>
    <div className='start-popup-btn-wrapper'>
      <div onClick={props.closeFunc} className='start-popup-btn'>
        Start.
      </div>
      <div onClick={props.closeFunc} className='start-popup-btn'>
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
