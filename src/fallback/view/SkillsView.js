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

const SkillsView = observer(props => (
  <div className='fallback-view-wrapper skills-wrapper'>
    {props.state.fallbackUseSkillMap ? <div className='show-help-btn' onClick={props.state.showExplanation}>
      <FontAwesomeIcon icon={'info'} />
    </div> : ''}
    <SimplifySkillsOverviewButton fallbackUseSkillMap={props.state.fallbackUseSkillMap} setFallbackUseSkillMapFunc={props.state.setFallbackUseSkillMap} />
    {props.state.selection.skill
      ? <FallbackSkillDetails
        selectedListLength={props.state.fallbackSelection.selectedSkills.length}
        indexOfSelectedSkillInSelectedSkills={props.state.fallbackSelection.indexOfSelectedSkillInSelectedSkills}
        show={props.state.fallbackShowSkillDetails}
        showInner={props.state.fallbackShowSkillDetailsInner}
        scrollSkillFunc={props.state.scrollSkill}
        closeSkillDetailsFunc={() => props.state.fallbackSetShowSkillDetails(false)}
        column={props.state.selection.column}
        category={props.state.selection.category}
        skill={props.state.selection.skill} />
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
