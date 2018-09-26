'use strict'

import React from 'react'
// import PropTypes from 'prop-types'

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
      Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
    </p>
    <p>
      Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
    </p>
    <p>
      Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.
    </p>
  </div>
))

// AboutTableComponent.propTypes = {
//   state: PropTypes.object,
//   columns: PropTypes.array
// }

export default AboutTextComponent
