'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import LicenseAndImpressumLink from './Components/LicenseAndImpressumLink'

import SkillsMap from '../../view/Skills/SkillsMap'

const SkillsView = observer(props => (
  <div className='fallback-view-wrapper skills-wrapper'>
    <SkillsMap state={props.state} columns={props.state.columns} />
    <LicenseAndImpressumLink />
  </div>
))

SkillsView.propTypes = {
  state: PropTypes.object,
  global: PropTypes.object
}

export default SkillsView
