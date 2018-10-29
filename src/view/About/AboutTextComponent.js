'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import MYAGE from '../../config/MyAge'

/** Describes the text about me on the about page */
const AboutTextComponent = observer((props) => (
  <div className={(props.fallback ? 'fallback-' : '') + 'about-text-wrapper'}>
    {props.includeFallbackPicture ? <img className='fallback-about-picture' alt='Picture of me with triangles.' src='/fallback_pic.png' /> : ''}
    <p>
      <strong className='about-text-intro-sentence'>Hi there,</strong> my name is Marvin Alexander Rüll, I am {MYAGE} years old and I take interest in everything regarding information technology since more than 3 years. Development as a whole is present in my life since about 10 years, from the book &quot;Delphi for Kids&quot; (<i>pascal</i>) to this website and a lot in between. I would call my work professional since only about 3 years, thought.
    </p>
    <p>
      That means that at this point I have experience in the complete media development stack, from my <a href='/#/skills/skill/linux'>debian</a> server, running <a href='/#/skills/skill/nginx'>nginx</a> and <a href='/#/skills/skill/nodejs'>NodeJS</a>, to me coding an interactive poll platform with <a href='/#/skills/skill/django'>django</a>, playing around with my <a href='/#/skills/skill/c++'>arduino</a> and publishing my own forked <a href='/#/skills/skill/python'>python</a> module with <a href='/#/skills/skill/c'>C</a>-bindings, to this page with fancy new tech like <a href='/#/skills/skill/mobx'>mobX</a>, <a href='/#/skills/skill/reactjs'>ReactJS</a> and <a href='/#/skills/skill/webpack-4'>webpack 4</a>. Quite about anything you can imagine was in between my curious fingers, to at least get a peek at it.
    </p>
    <p>
      In my freetime I like to play theatre and beeing together with people I like.
    </p>
  </div>
))

AboutTextComponent.propTypes = {
  includeFallbackPicture: PropTypes.bool,
  fallback: PropTypes.bool
}

export default AboutTextComponent
