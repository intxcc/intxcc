'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import MARK_TOOLTIP from '../../../config/MarkTooltips'

import {
  FilterCheckboxesWrapper,
  FilterCheckboxesCategory,
  FilterCheckbox,
  FilterSearch
} from '../../../view/Skills/SkillFilterComponents'

const FallbackSkillsFilter = observer(props => (
  <div className={'fallback-skills-filter-wrapper' + (props.show ? ' show' : '')}>
    <div className='fallback-skills-filter-inner'>
      <h1>Filter</h1>
      <FilterCheckboxesWrapper isCheckedView={props.state.filter.isChecked} toggleFunc={props.state.filter.toggleOption}>
        <FilterCheckboxesCategory>
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
        <FilterCheckboxesCategory>
          <FilterCheckbox name='with-comments' tooltip='with comment'>
            <FontAwesomeIcon icon={['far', 'comment-dots']} />
          </FilterCheckbox>
        </FilterCheckboxesCategory>
      </FilterCheckboxesWrapper>
      <FilterSearch searchText={props.state.filter.options.get('search') ? props.state.filter.options.get('search').value : ''} onChange={(input) => props.state.filter.setOption('search', input)} />
    </div>
    <div onClick={() => props.state.fallbackSetShowFilter(false)} className='fallback-skill-filter-button'>
      <FontAwesomeIcon icon={'window-close'} />
    </div>
  </div>
))

FallbackSkillsFilter.propTypes = {
  show: PropTypes.bool,
  state: PropTypes.object
}

export default FallbackSkillsFilter
