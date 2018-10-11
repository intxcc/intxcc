'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

const SkillMenu = observer((props) => (
  <ul className='skill-menu-wrapper'>
    <li className='skill-menu-item'>
      <span className='skill-menu-title'>Filter</span>
      <span className='skill-menu-icon'><FontAwesomeIcon icon={'filter'} /></span>
    </li>
  </ul>
))

SkillMenu.propTypes = {
  state: PropTypes.object
}

export default SkillMenu
