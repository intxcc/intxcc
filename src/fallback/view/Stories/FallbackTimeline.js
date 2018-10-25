'use strict'

import React from 'react'
// import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

const FallbackTimeline = observer(props => (
  <div className='fallback-timeline-wrapper'>
    test
  </div>
))

// FallbackSkillColumns.propTypes = {
//   selection: PropTypes.object,
//   fallbackSelection: PropTypes.object,
//   columns: PropTypes.object
// }

export default FallbackTimeline
