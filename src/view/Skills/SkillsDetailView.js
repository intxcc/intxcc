'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import MARK_TOOLTIP from '../../config/MarkTooltips'

const SkillsDetailView = observer((props) => (
  <div className='skills-detail-view'>
    {props.selection.skill.desc ? <p>
      {props.selection.skill.desc}
    </p> : ''}
    <h1>
      {props.selection.skill.desc || props.selection.skill.trivia ? <div title={'with comment'} className='skills-detail-view-icon'>
        <FontAwesomeIcon icon={['far', 'comment-dots']} />
      </div> : ''}
      <div className='skills-detail-view-mark' title={MARK_TOOLTIP[props.selection.skill.mark]}>{props.selection.skill.mark}</div>
      {props.selection.skill.title}
    </h1>
    {props.selection.skill.trivia ? <p className='skills-detail-view-trivia'>
      {props.selection.skill.trivia}
    </p> : ''}
  </div>
))

SkillsDetailView.propTypes = {
  selection: PropTypes.object
}

export default SkillsDetailView
