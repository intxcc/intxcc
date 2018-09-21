'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const MenuComponent = observer((props) => {
  const menuEntries = [
    {
      name: 'about',
      caption: 'about me'
    }, {
      name: 'stories',
      caption: 'stories'
    }, {
      name: 'skills',
      caption: 'skills'
    }, {
      name: 'contact',
      caption: 'contact'
    }
  ]

  for (let i in menuEntries) {
    let menuEntry = menuEntries[i]
    if (menuEntry.name === props.selection) {
      menuEntries[i].selected = true
    }
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
    </div>
  )
})

MenuComponent.propTypes = {
  selection: PropTypes.string
}

export default MenuComponent
