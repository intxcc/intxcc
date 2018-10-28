'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import LicenseAndImpressumLink from './Components/LicenseAndImpressumLink'

import SimplifySkillsOverviewButton from './Skills/SimplifySkillsOverviewButton'

import SkillsMap from '../../view/Skills/SkillsMap/SkillsMap'

import FallbackSkills from './Skills/FallbackSkills'
import FallbackSkillDetails from './Skills/FallbackSkillDetails'

import FallbackSkillsFilter from './Skills/FallbackSkillsFilter'

const SkillsView = observer(props => (
  <div className={'fallback-view-wrapper skills-wrapper' + (props.state.fallbackShowFilter ? ' filter-active' : '')}>
    <FallbackSkillsFilter
      show={props.state.fallbackShowFilter}
      state={props.state} />
    <div className='show-help-btn-fallback-wrapper'>
      {props.state.fallbackUseSkillMap ? <div className='show-help-btn second-btn' onClick={props.state.showExplanation}>
        <FontAwesomeIcon icon={'info'} />
      </div> : ''}
      {props.state.fallbackUseSkillMap ? <div className='show-help-btn' onClick={props.state.fallbackToggleShowFilter}>
        <FontAwesomeIcon icon={'filter'} />
      </div> : ''}
    </div>
    <SimplifySkillsOverviewButton show={props.global.fallbackShowControls} fallbackUseSkillMap={props.state.fallbackUseSkillMap} setFallbackUseSkillMapFunc={props.state.setFallbackUseSkillMap} />
    {props.state.selection.skill
      ? <FallbackSkillDetails
        fallbackOnScrollFunc={props.global.fallbackOnScroll}
        selectedListLength={props.state.fallbackSelection.selectedSkills.length}
        indexOfSelectedSkillInSelectedSkills={props.state.fallbackSelection.indexOfSelectedSkillInSelectedSkills}
        show={props.state.fallbackShowSkillDetails}
        showInner={props.state.fallbackShowSkillDetailsInner}
        scrollSkillFunc={props.state.scrollSkill}
        closeSkillDetailsFunc={() => props.state.fallbackSetShowSkillDetails(false)}
        column={props.state.selection.column}
        category={props.state.selection.category}
        skill={props.state.selection.skill}
        storiesFilter={props.state.storiesFilter} />
      : ''}
    {props.state.fallbackUseSkillMap
      ? <SkillsMap state={props.state} columns={props.state.columns} />
      : <FallbackSkills state={props.state} columns={props.state.columns} openSkillDetailsFunc={() => props.state.fallbackSetShowSkillDetails(true)} />}
    <LicenseAndImpressumLink />
  </div>
))

SkillsView.propTypes = {
  state: PropTypes.object,
  global: PropTypes.object
}

export default SkillsView
