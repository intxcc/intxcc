'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    PropTypes.array,
    PropTypes.object
  ]),
  title: PropTypes.string,
  isCheckedView: PropTypes.func,
  toggleFunc: PropTypes.func
}

const FilterCheckbox = observer((props) => (
  <div className={'filter-checkbox' + (props.isCheckedView(props.name) ? ' checked' : '')} onClick={() => props.toggleFunc(props.name)}>
    {props.children}
  </div>
))

FilterCheckbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  name: PropTypes.string,
  isCheckedView: PropTypes.func,
  toggleFunc: PropTypes.func
}

const SkillFilter = observer((props) => (
  <div className='skill-filter-wrapper-outer'>
    <div className={'skill-filter-wrapper' + (props.showSkillFilter ? ' skill-filter-visible' : '')}>
      <h1>Filter</h1>
      <FilterCheckboxesWrapper isCheckedView={props.state.filter.isChecked} toggleFunc={props.state.filter.toggleOption}>
        <FilterCheckboxesCategory title='Mark'>
          <FilterCheckbox name='mark-1'>
            1
          </FilterCheckbox>
          <FilterCheckbox name='mark-2'>
            2
          </FilterCheckbox>
          <FilterCheckbox name='mark-3'>
            3
          </FilterCheckbox>
        </FilterCheckboxesCategory>
        <FilterCheckboxesCategory title='Other'>
          <FilterCheckbox name='with-comments'>
            <FontAwesomeIcon icon={['far', 'comment-dots']} />
          </FilterCheckbox>
        </FilterCheckboxesCategory>
      </FilterCheckboxesWrapper>
    </div>
  </div>
))

SkillFilter.propTypes = {
  showSkillFilter: PropTypes.bool,
  state: PropTypes.object
}

export default SkillFilter
