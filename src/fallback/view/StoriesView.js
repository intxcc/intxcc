'use strict'

import React from 'react'
// import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import LicenseAndImpressumLink from './Components/LicenseAndImpressumLink'

const StoriesView = observer(props => (
  <div className='fallback-view-wrapper stories-wrapper'>
    <div className='stories-wrapper-inner'>
      <h1>Stories</h1>
    </div>
    <LicenseAndImpressumLink />
  </div>
))

// AboutView.propTypes = {
//   global: PropTypes.object
// }

export default StoriesView
