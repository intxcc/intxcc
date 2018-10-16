'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import LicenseAndImpressumLink from './Components/LicenseAndImpressumLink'

import SimplifySkillsOverviewButton from './Skills/SimplifySkillsOverviewButton'
import SkillsMap from '../../view/Skills/SkillsMap'
import FallbackSkills from './Skills/FallbackSkills'
import FallbackSkillDetails from './Skills/FallbackSkillDetails'

const SkillsView = observer(props => (
  <div className='fallback-view-wrapper skills-wrapper'>
    <SimplifySkillsOverviewButton fallbackUseSkillMap={props.state.fallbackUseSkillMap} setFallbackUseSkillMapFunc={props.state.setFallbackUseSkillMap} />
    <FallbackSkillDetails show={props.state.fallbackShowSkillDetails} />
    {props.state.fallbackUseSkillMap
      ? <FallbackSkills state={props.state} columns={props.state.columns} />
      : <SkillsMap state={props.state} columns={props.state.columns} />}
    <LicenseAndImpressumLink />
  </div>
))

SkillsView.propTypes = {
  onScrollCallbackFunc: PropTypes.func,
  state: PropTypes.object,
  global: PropTypes.object
}

export default SkillsView
