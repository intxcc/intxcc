'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

const BurgerMenu = observer(props => (
  <div className='burger-menu-wrapper'>
    <div className='burger-menu-handle'>
      <FontAwesomeIcon icon='bars' />
    </div>
  </div>
))

BurgerMenu.propTypes = {
  state: PropTypes.object,
  global: PropTypes.object
}

export default BurgerMenu
