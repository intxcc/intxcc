'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import PopupComponent from '../Components/PopupComponent'

const ExplanationPopup = observer((props) => (
  <PopupComponent basicInfo={props.state.basicInfo} title='Explanation of skills'>
    <p className='skills-explanation-p'>
      The following skills are are rated from 1 to 3, where 1 is basic knowledge and 3 is very good knowledge.<br />
      <br />
      <i>The rating is shown on the left side of each skill.</i>
    </p>
  </PopupComponent>
))

ExplanationPopup.propTypes = {
  state: PropTypes.object
}

export default ExplanationPopup
