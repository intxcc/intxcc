'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const SkillsMapItem = observer((props) => (
  <div className='skills-map-item'>
    {props.title}
  </div>
))

SkillsMapItem.propTypes = {
  title: PropTypes.string
}

export default SkillsMapItem
