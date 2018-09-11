'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import ViewObject from '../General/ViewObject'

const Year = (props) => (
  <li
    className={props.selected ? 'selected' : ''}
    onClick={props.selectYear}>
    {props.year}
  </li>
)

Year.propTypes = {
  year: PropTypes.string,
  selected: PropTypes.bool,
  selectYear: PropTypes.func
}

const YearSelection = observer((props) => (
  <ViewObject object={props.object}>
    <ul className='year-selection-list'>
      {props.years.map((year, index) => (
        <Year
          key={'year-selection-' + year}
          year={String(year)}
          selectYear={() => props.selectYear(index)}
          selected={index === props.selectedYear} />
      ))}
    </ul>
  </ViewObject>
))

YearSelection.propTypes = {
  // An object entity of the view. E.g. props.view.objects.get('year-selection')
  object: PropTypes.object,
  years: PropTypes.array,
  selectedYear: PropTypes.number,
  selectYear: PropTypes.func
}

export default YearSelection
