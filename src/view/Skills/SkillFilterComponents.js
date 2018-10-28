'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const FilterCheckboxesWrapper = observer((props) => (
  <div className='filter-checkbox-wrapper'>
    {React.Children.map(props.children, child => (
      React.cloneElement(child, {
        isCheckedView: props.isCheckedView,
        toggleFunc: props.toggleFunc
      }))
    )}
  </div>
))

FilterCheckboxesWrapper.propTypes = {
  children: PropTypes.object,
  isCheckedView: PropTypes.func,
  toggleFunc: PropTypes.func
}

const FilterCheckboxesCategory = observer((props) => (
  <div className='filter-checkbox-category'>
    <div className='filter-checkbox-category-title'>{props.title}</div>
    {React.Children.map(props.children, child => (
      React.cloneElement(child, {
        isCheckedView: props.isCheckedView,
        toggleFunc: props.toggleFunc
      }))
    )}
  </div>
))

FilterCheckboxesWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  title: PropTypes.string,
  isCheckedView: PropTypes.func,
  toggleFunc: PropTypes.func
}

const FilterCheckbox = observer((props) => (
  <div title={props.tooltip} className={'filter-checkbox' + (props.isCheckedView(props.name) ? ' checked' : '')} onClick={() => props.toggleFunc(props.name)}>
    {props.children}
  </div>
))

FilterCheckbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  tooltip: PropTypes.string,
  name: PropTypes.string,
  isCheckedView: PropTypes.func,
  toggleFunc: PropTypes.func
}

const FilterSearch = observer((props) => (
  <div className='filter-search-wrapper'>
    <input className='filter-search-text-input' value={props.searchText} onChange={(e) => props.onChange(e.target.value)} type='text' placeholder='Search' />
  </div>
))

FilterSearch.propTypes = {
  searchText: PropTypes.string,
  onChange: PropTypes.func
}

export {
  FilterCheckboxesWrapper,
  FilterCheckboxesCategory,
  FilterCheckbox,
  FilterSearch
}
