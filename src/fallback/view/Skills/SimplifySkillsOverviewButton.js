'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const SimplifySkillsOverviewButton = observer(props => (
  <div className='fallback-skills-simplify-overview-button-wrapper'>
    <div className='fallback-skills-simplify-overview-button' onClick={() => props.setFallbackUseSkillMapFunc(!props.fallbackUseSkillMap)}>
      {props.fallbackUseSkillMap ? 'Click here to show all skills as map.' : 'Close map.'}
    </div>
  </div>
))

SimplifySkillsOverviewButton.propTypes = {
  fallbackUseSkillMap: PropTypes.bool,
  setFallbackUseSkillMapFunc: PropTypes.func
}

export default SimplifySkillsOverviewButton
