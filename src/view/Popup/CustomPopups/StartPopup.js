'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const StartPopup = observer(props => (
  <div className='popup start-popup'>
    <h1>What is this?</h1>
    <h2>
      This is intxcc:<br />
      This is future:<br />
      This is freedom:<br />
      This is warm summer rain:<br />
      This is design:<br />
      <span className='start-popup-for-you-span'>This is for you.</span>
    </h2>
    <h1>This is development, design &amp; art from Berlin.</h1>
    <div onClick={props.closeFunc} className='start-popup-ok-btn'>
      understood
    </div>
    <div onClick={props.closeFunc} className='start-popup-ok-btn start-popup-ok-btn2'>
      ok, whatever.
    </div>
  </div>
))

StartPopup.propTypes = {
  closeFunc: PropTypes.func,
  popup: PropTypes.object
}

export default StartPopup
