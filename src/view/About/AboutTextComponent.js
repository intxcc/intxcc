'use strict'

import React from 'react'

import { observer } from 'mobx-react'

import MYAGE from '../../config/MyAge'

const AboutTextComponent = observer((props) => (
  <div className='about-text-wrapper'>
    <p>
      <strong className='about-text-intro-sentence'>Hi there,</strong> my name is Marvin Alexander Rüll, I am {MYAGE} years old and I take interest in everything regarding information technology since more than 3 years. Development as a whole is present in my life since about 10 years, from the book &quot;Delphi for Kids&quot; (<i>pascal</i>) to this website and a lot in between. I would call my work professional since only about 3 years, thought.
    </p>
    <p>
      That means that at this point I have experience in the complete media development stack, from my <a href='/#/skills/skill-76-linux'>debian</a> server, running <a href='/#/skills/skill-30-nginx'>nginx</a> and <a href='/#/skills/skill-31-nodejs'>NodeJS</a>, to me coding an interactive poll platform with <a href='/#/skills/skill-21-django'>django</a>, playing around with my <a href='/#/skills/skill-27-c++'>arduino</a> and publishing my own forked <a href='/#/skills/skill-20-python'>python</a> module with <a href='/#/skills/skill-26-c'>C</a>-bindings, to this page with fancy new tech like <a href='/#/skills/skill-8-mobx'>mobX</a>, <a href='/#/skills/skill-7-reactjs'>ReactJS</a> and <a href='/#/skills/skill-15-webpack-4'>webpack 4</a>. Quite about anything you can imagine was in between my curious fingers, to at least get a peek at it.
    </p>
    <p>
      In my freetime I like to play theatre and beeing together with people I like.
    </p>
  </div>
))

export default AboutTextComponent
