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
  <ViewObject object={props.object} className={props.className}>
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
  // An object entity of the view. E.g. props.view.objects.get('year-selection'). That means, that before you can use this component you need to position it in the View Model fist.
  object: PropTypes.object,
  // Additional class name
  className: PropTypes.string,
  // An array with the years that should be displayed
  years: PropTypes.array,
  // The index of the selected year
  selectedYear: PropTypes.number,
  // The function to select a year. Receives a year index as a single input: selectYear(index)
  selectYear: PropTypes.func
}

export default YearSelection
