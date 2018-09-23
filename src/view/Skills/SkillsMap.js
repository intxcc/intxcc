'use strict'

import React from 'react'
// import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import SkillsMapColumn from './SkillsMapColumn'
import SkillsMapCategory from './SkillsMapCategory'
import SkillsMapItem from './SkillsMapItem'

const SkillsMap = observer((props) => (
  <div className='skills-map-wrapper'>
    <SkillsMapColumn title={'Concepts'}>
      <SkillsMapCategory title={'Coding'}>
        <SkillsMapItem title={'Coding Style Guides'} />
        <SkillsMapItem title={'DRY'} />
        <SkillsMapItem title={'KISS'} />
        <SkillsMapItem title={'RESTful'} />
        <SkillsMapItem title={'Reusable Components'} />
      </SkillsMapCategory>
      <SkillsMapCategory title={'Design'}>
        <SkillsMapItem title={'Responsive Design'} />
        <SkillsMapItem title={'Material Design'} />
      </SkillsMapCategory>
      <SkillsMapCategory title={'Model'}>
        <SkillsMapItem title={'Scrum'} />
        <SkillsMapItem title={'Agile'} />
      </SkillsMapCategory>
    </SkillsMapColumn>
    <SkillsMapColumn title={'Admin'}>
      <SkillsMapCategory title={'Webserver'}>
        <SkillsMapItem title={'nginx'} />
        <SkillsMapItem title={'NodeJS'} />
        <SkillsMapItem title={'Apache2'} />
      </SkillsMapCategory>
      <SkillsMapCategory title={'Database'}>
        <SkillsMapItem title={'MySQL'} />
        <SkillsMapItem title={'MongoDB'} />
        <SkillsMapItem title={'Redis'} />
      </SkillsMapCategory>
      <SkillsMapCategory title={'Communication'}>
        <SkillsMapItem title={'Dovecot'} />
        <SkillsMapItem title={'ejabberd'} />
        <SkillsMapItem title={'Postfix'} />
        <SkillsMapItem title={'Roundcube'} />
      </SkillsMapCategory>
    </SkillsMapColumn>
    <SkillsMapColumn title={'Languages'} />
    <SkillsMapColumn title={'Tools'} />
    <SkillsMapColumn title={'OSs'} />
  </div>
))

// SkillsMap.propTypes = {
//   year: PropTypes.string,
//   selected: PropTypes.bool,
//   selectYear: PropTypes.func
// }

export default SkillsMap
