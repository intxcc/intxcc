'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
