'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const SkillsMapColumn = observer((props) => (
  <div className='skills-map-column'>
    <h1>
      {props.title}
    </h1>
    {props.children}
  </div>
))

SkillsMapColumn.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array
}

export default SkillsMapColumn
