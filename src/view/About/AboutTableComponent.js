'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import MYAGE from '../../config/MyAge'

const AboutTableItem = observer((props) => (
  <li className='about-table-item'>
    <div className='about-table-item-title'>
      {props.title}
    </div>
    <div className='about-table-item-text'>
      {props.text}
    </div>
  </li>
))

AboutTableItem.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
}

const AboutTableComponent = observer((props) => (
  <ul className='about-table-component'>
    <AboutTableItem title='name' text='Marvin Alexander Rüll' />
    <AboutTableItem title='year of birth' text={'1994 (' + MYAGE + 'yrs)'} />
    <AboutTableItem title='location' text='Berlin / Germany' />
    <AboutTableItem title='stack' text='Full Stack' />
    <AboutTableItem title='experience' text='3+ years' />
    <AboutTableItem title='favorite subfield' text='Web Design &amp; Development' />
  </ul>
))

// AboutTableComponent.propTypes = {
//   state: PropTypes.object,
//   columns: PropTypes.array
// }

export default AboutTableComponent
