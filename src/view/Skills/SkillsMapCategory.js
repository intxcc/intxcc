'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const SkillsMapCategory = observer((props) => (
  <div className='skills-map-category'>
    <h2>
      {props.title}
    </h2>
    {props.children}
  </div>
))

SkillsMapCategory.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array
}

export default SkillsMapCategory
