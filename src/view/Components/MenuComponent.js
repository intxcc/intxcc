'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import { DefaultMenuEntries } from '../../config/MenuEntries'

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
            <FontAwesomeIcon icon={['fab', 'creative-commons']} /> <FontAwesomeIcon icon={['fab', 'creative-commons-by']} /> <FontAwesomeIcon icon={['fab', 'creative-commons-sa']} />
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
