'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import { FallbackMenuEntries } from '../../../config/MenuEntries'

const BurgerMenuItem = observer(props => (
  <a className='burger-menu-entry-link' href={'#/' + (props.name === 'startpage' ? '' : props.name + '/')}>
    <div className={'burger-menu-entry' + (props.selected ? ' selected' : '')}>
      {props.caption}
    </div>
  </a>
))

BurgerMenuItem.propTypes = {
  name: PropTypes.string,
  caption: PropTypes.string,
  selected: PropTypes.bool
}

const BurgerMenu = observer(props => (
  <div className='burger-menu-wrapper'>
    <div className='burger-menu-handle-wrapper'>
      <div className={'burger-menu-handle' + (props.show ? ' active' : '')} onClick={() => props.setShowFunc(!props.show)}>
        <FontAwesomeIcon icon='bars' />
      </div>
    </div>
    <div className={'burger-menu' + (props.show ? ' active' : '')}>
      <div className='burger-menu-inner'>
        {FallbackMenuEntries.map((menuEntry, index) => (
          <BurgerMenuItem key={'burger-menu-entry-' + index} name={menuEntry.name} caption={menuEntry.caption} selected={menuEntry.name === props.activePage} />
        ))}
      </div>
    </div>
  </div>
))

BurgerMenu.propTypes = {
  activePage: PropTypes.string,
  show: PropTypes.bool,
  setShowFunc: PropTypes.func
}

export default BurgerMenu
