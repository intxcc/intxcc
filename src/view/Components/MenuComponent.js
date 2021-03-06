'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import { DefaultMenuEntries } from '../../config/MenuEntries'

import GLPv3LogoPath from './GLPv3LogoPath'

/** Describes the menu at the bottom of the normal version of the website */
const MenuComponent = observer((props) => {
  let menuEntries = []

  for (let i in DefaultMenuEntries) {
    let menuEntry = Object.assign({}, DefaultMenuEntries[i])

    if (menuEntry.name === props.selection) {
      menuEntry.selected = true
    }

    menuEntries.push(menuEntry)
  }

  return (
    <div className='menu-wrapper'>
      <ul className='menu-component'>
        <li>Menu</li>
        {menuEntries.map(entry => (
          <li key={'menu-entry-' + entry.name} className={entry.selected ? 'selected' : ''}>
            <a href={'#/' + entry.name + '/'}>
              {entry.caption}
            </a>
          </li>
        ))}
      </ul>
      <div className='menu-impressum-license-link'>
        <a target='_blank' rel='noopener noreferrer' href='/impressum.html'>Impressum &amp; License
          <span className='menu-impressum-symbols'>
            <GLPv3LogoPath />
          </span>
        </a>
      </div>
    </div>
  )
})

MenuComponent.propTypes = {
  selection: PropTypes.string
}

export default MenuComponent
