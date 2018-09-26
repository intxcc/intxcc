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
      That means that at this point I have experience in the complete media development stack, from my <i>debian</i> server, running <i>nginx</i> and <i>nodejs</i>, to me coding an interactive poll platform with <i>django</i>, playing around with my <i>arduino</i> and publishing my own forked <i>python</i> module with <i>C</i>-bindings, to this page with fancy new tech like <i>mobX</i>, <i>React</i> and <i>webpack 4</i>. Quite about anything you can imagine was in between my curious fingers, to at least get a peek at it.
    </p>
    <p>
      In my freetime I like to play theatre and beeing together with people I like.
    </p>
  </div>
))

export default AboutTextComponent
