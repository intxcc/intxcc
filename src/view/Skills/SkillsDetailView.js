'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

const SkillsDetailView = observer((props) => (
  <div className='skills-detail-view'>
    {props.selection.skill.desc ? <p>
      {props.selection.skill.desc}
    </p> : ''}
    <h1>
      {props.selection.skill.desc ? <div className='skills-detail-view-icon'>
        <FontAwesomeIcon icon={['far', 'comment-dots']} />
      </div> : ''}
      <div className='skills-detail-view-mark'>{props.selection.skill.mark}</div>
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
