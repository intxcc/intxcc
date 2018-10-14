'use strict'

import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

const LicenseAndImpressumLink = observer(props => (
  <div className='fallback-license-and-impressum-link'>
    <a target='_blank' rel='noopener noreferrer' href='/impressum.html'>Impressum &amp; License
      <span className='menu-impressum-symbols'>
        <FontAwesomeIcon icon={['fab', 'creative-commons']} /> <FontAwesomeIcon icon={['fab', 'creative-commons-by']} /> <FontAwesomeIcon icon={['fab', 'creative-commons-sa']} />
      </span>
    </a>
  </div>
))

export default LicenseAndImpressumLink
