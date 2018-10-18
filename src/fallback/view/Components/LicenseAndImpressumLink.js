'use strict'

import React from 'react'

import { observer } from 'mobx-react'

import GLPv3LogoPath from '../../../view/Components/GLPv3LogoPath'

const LicenseAndImpressumLink = observer(props => (
  <div className='fallback-license-and-impressum-link'>
    <a target='_blank' rel='noopener noreferrer' href='/impressum.html'>Impressum &amp; License
      <span className='menu-impressum-symbols'>
        <GLPv3LogoPath />
      </span>
    </a>
  </div>
))

export default LicenseAndImpressumLink
