'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import PopupComponent from '../Components/PopupComponent'

const ExplanationPopup = observer((props) => (
  <PopupComponent basicInfo={props.state.basicInfo} title='Explanation'>
    <p>
      Test
    </p>
  </PopupComponent>
))

ExplanationPopup.propTypes = {
  state: PropTypes.object
}

export default ExplanationPopup
