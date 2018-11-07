'use strict'

import React from 'react'

const StoryText = (
  <div>
    <p className='p-h3'>This is about the website: Information about the server <a href='/#/stories/story-intxcc-server'>here</a>.</p>
    <p>
      See <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/intxcc'>the project</a> on my <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/'>GitHub page</a>.<br />
      <br />
      At around 13.500 lines of code, this website might very well be the biggest project I completed so far.<br />
      <br />
      My main focus was to make a beautiful design, that displays information about me in an simple, comprehensible, but good looking way. For example the skills page is in my opinion far cleaner at showing all the information one could want to know, than just a normal list, while still beeing unique.<br />
      <br />
      The concept started with the simple theory to completely build a website only with triangles. Of course I needed to sometimes compromise in favor of usability, but I think the theme comes across. It conceives a minimalistic, modern and cohere user experience.<br />
      <br />
      Before the actual development process started, around 1 month passed, where all focus was on the design. At first everything on paper, because I think for rough design sketches it is far more intuitive. First on A4 paper, then on A3 paper.<br />
      <br />
      That was the first 2-3 weeks. Then in the last week everything was sketched again in Inkscape. To digitalize the design I tried to use as few different angles as possible, because that felt more uniformely looking.<br />
      <br />
      Even before I started on paper I wanted to make the triangles morph into each other instead of just changing the site, so before the development really started I wrote a <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/intxcc/commit/644970c36900ff1b39cfc2d05b324dde04de05c3'>Morph PoC.</a> to figure out which libraries and data structures are useful and if the concept would work at all. In past experiences I noticed that if one starts right away, one will build something broken, tear everything down and start again the right way with everything learned so far. One could argue whether the PoC is this step or does skip it.<br />
      <br />
      The next big step was when the problem araised, that on small displays, as well as - of course - in Internet Explorer, everything would break apart. So I decided after thinking for a long time, to create the complete site, from ground up again, in a responsive way. As fallback, for small displays and Internet Explorer. I thought about responsiveness from the get-go, but the design with the fading triangles would not have made any sense on small screens, so the only step, without having to compromise on the desktop layout I am very happy with, was to create two different views but an uniform state.<br />
      <br />
      That step was great in hindsight. I am still able to reuse some components - like the skill map - that makes sense in the fallback version and could fully optimize each view version for its own purpose without having to make any compromises. And the state was no problem at all, because the state is the same, no matter which view one does use. Some view specific states are only used in one version, but they could - if one would need to - be used in the other view at any time.<br />
      <br />
      All in all I can say, that this project was very challenging and sometimes exhausting, but in the end it was worth all the trouble, because it fulfils the purpose I developed this for, that was written in my organization tool - the Deck-App of nextcloud - from the start and helped me to not lose the big picture out of sight: <strong>To make a great website.</strong><br />
      <br />
      Yeah. Alright .. ok. There stood: <i>To demonstrate my skills.</i> But <i>To make a great website.</i> just has a better ring to it, doesn&apos;t it?
    </p>
  </div>
)

export default StoryText
