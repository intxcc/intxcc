'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import { FallbackMenuEntries } from '../../../config/MenuEntries'

/** The burger menu is the main menu of the fallback. It is mostly shown by 3 lines on the top left. */
const BurgerMenuItem = observer(props => (
  <a className='burger-menu-entry-link' href={'#/' + (props.name === 'startpage' ? '' : props.name + '/')}>
    <div onClick={props.disableBurgerMenuFunc} className={'burger-menu-entry' + (props.selected ? ' selected' : '')}>
      {props.caption}
    </div>
  </a>
))

BurgerMenuItem.propTypes = {
  name: PropTypes.string,
  caption: PropTypes.string,
  disableBurgerMenuFunc: PropTypes.func,
  selected: PropTypes.bool
}

const BurgerMenu = observer(props => (
  <div className='burger-menu-wrapper'>
    <div className='burger-menu-handle-wrapper'>
      <div className={'burger-menu-handle' + (!props.showHandle ? ' hide' : '') + (props.show ? ' active' : '') + (props.activePage !== 'startpage' ? ' background-color-enabled' : '')} onClick={() => props.setShowFunc(!props.show)}>
        <FontAwesomeIcon icon='bars' />
      </div>
    </div>
    <div className={'burger-menu' + (props.show ? ' active' : '')}>
      <div className='burger-menu-inner'>
        {FallbackMenuEntries.map((menuEntry, index) => (
          <BurgerMenuItem
            key={'burger-menu-entry-' + index}
            name={menuEntry.name}
            caption={menuEntry.caption}
            disableBurgerMenuFunc={() => props.setShowFunc(false)}
            selected={menuEntry.name === props.activePage} />
        ))}
      </div>
    </div>
  </div>
))

BurgerMenu.propTypes = {
  showHandle: PropTypes.bool,
  activePage: PropTypes.string,
  show: PropTypes.bool,
  setShowFunc: PropTypes.func
}

export default BurgerMenu
