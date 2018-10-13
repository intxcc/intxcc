'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

const BurgerMenu = observer(props => (
  <div className='burger-menu-wrapper'>
    <div className={'burger-menu-handle' + (props.show ? ' active' : '')} onClick={() => props.setShowFunc(!props.show)}>
      <FontAwesomeIcon icon='bars' />
    </div>
    <div className={'burger-menu' + (props.show ? ' active' : '')}>
    </div>
  </div>
))

BurgerMenu.propTypes = {
  show: PropTypes.bool,
  setShowFunc: PropTypes.func
}

export default BurgerMenu
