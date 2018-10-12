'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import MARK_TOOLTIP from '../../config/MarkTooltips'

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
    PropTypes.array,
    PropTypes.object
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

const SkillFilter = observer((props) => (
  <div className='skill-filter-wrapper-outer'>
    <div className={'skill-filter-wrapper' + (props.showSkillFilter ? ' skill-filter-visible' : '')}>
      <h1>Filter</h1>
      <FilterCheckboxesWrapper isCheckedView={props.state.filter.isChecked} toggleFunc={props.state.filter.toggleOption}>
        <FilterCheckboxesCategory title='Mark'>
          <FilterCheckbox name='mark-1' tooltip={MARK_TOOLTIP['1']}>
            1
          </FilterCheckbox>
          <FilterCheckbox name='mark-2' tooltip={MARK_TOOLTIP['2']}>
            2
          </FilterCheckbox>
          <FilterCheckbox name='mark-3' tooltip={MARK_TOOLTIP['3']}>
            3
          </FilterCheckbox>
        </FilterCheckboxesCategory>
        <FilterCheckboxesCategory title='Other'>
          <FilterCheckbox name='with-comments' tooltip='with comment'>
            <FontAwesomeIcon icon={['far', 'comment-dots']} />
          </FilterCheckbox>
        </FilterCheckboxesCategory>
      </FilterCheckboxesWrapper>
      <FilterSearch searchText={props.state.filter.options.get('search') ? props.state.filter.options.get('search').value : ''} onChange={(input) => props.state.filter.setOption('search', input)} />
    </div>
  </div>
))

SkillFilter.propTypes = {
  showSkillFilter: PropTypes.bool,
  state: PropTypes.object
}

export default SkillFilter
