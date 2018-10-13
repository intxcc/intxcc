'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import MenuEntries from '../../../config/MenuEntries'

const BurgerMenuItem = observer(props => (
  <div>
  </div>
))

BurgerMenuItem.propTypes = {
  name: PropTypes.string,
  caption: PropTypes.string,
  selected: PropTypes.bool
}

const BurgerMenu = observer(props => (
  <div className='burger-menu-wrapper'>
    <div className={'burger-menu-handle' + (props.show ? ' active' : '')} onClick={() => props.setShowFunc(!props.show)}>
      <FontAwesomeIcon icon='bars' />
    </div>
    <div className={'burger-menu' + (props.show ? ' active' : '')}>
      {MenuEntries.map((menuEntry, index) => (
        <BurgerMenuItem key={'burger-menu-entry-' + index} name={menuEntry.name} caption={menuEntry.caption} selected={menuEntry.name === props.activePage} />
      ))}
    </div>
  </div>
))

BurgerMenu.propTypes = {
  activePage: PropTypes.string,
  show: PropTypes.bool,
  setShowFunc: PropTypes.func
}

export default BurgerMenu
