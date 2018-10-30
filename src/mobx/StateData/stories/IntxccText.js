'use strict'

import React from 'react'

const StoryText = (
  <p>
    <h3>This is about the website: Information about the server <a href='/#/stories/story-intxcc-server'>here</a>.</h3><br />
    At around 13.500 lines of code, this website might very well be the biggest project I completed so far.<br />
    <br />
    My main focus was on making a beautiful design, that displays information about me in an easy, comprehensible, but good looking way. For example the skills page is in my opinion far cleaner at showing all the information one could want to know, than just a normal list, while still beeing unique.<br />
    <br />
    The concept started with the simple theory to completely build a website with just triangles. Of course I needed to sometimes compromise in favor of usability, but I think the theme comes across. It conceives a minimalistic, modern and cohere user experience.<br />
    <br />
    Before the actual development process started, around 1 month passed, where all focus was on the design. At first everything on paper, because I think for rough design sketches it is far more intuitive. First on A4 paper, then on A3 paper.<br />
    <br />
    That was the first 2 - 3 weeks. Then in the last week everything was sketched again in Inkscape, because I was using exclusively my linux laptop for this. To digitalize the disign I tried to use as few different angles as possible, because that felt more uniformely looking to me.<br />
    <br />
    Even before I started on paper I wanted to make the morph into each other instead of just changing the site, so before the development really started I wrote a <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/intxcc/commit/644970c36900ff1b39cfc2d05b324dde04de05c3'>Morph PoC.</a> to figure out which libraries and data structures to use and if the concept does even work at all. In past experiences I noticed that if one starts right away, one will build something broken, tear everything down and start again the right way with everything learned so far. One could argue if the PoC is this step or if it does skip it.<br />
    <br />
    The next big step was, that on small displays everything would break apart, as well as - of course - in Internet Explorer. So I decided after thinking for a long time, to create the complete site, from ground up, in a responsive way, again. As fallback, for small displays and Internet Explorer. I thought about responsiveness from the get-go, but the design with the fading triangles would not have made any sense on small screens, so the only step, without having to compromise on the desktop layout I am very happy with, was to creat two different views but a uniform state.<br />
    <br />
    That step was also great in hindsight. I were still able to reuse some components - like the skill map - that made sense in the fallback version and could fully optimize each view version for its purpose without having to make compromises. And the state was no problem at all, because the state is the same, no matter which view one does use. Only some view specific states are only used in one version, but they could - if one would need to - be used in the other view at any time.<br />
    <br />
    All in all I can say, that this project was very challenging and sometimes exhausting, but in the end it was worth all the trouble, because it fulfils the purpose I developed this for, that was written in my organization tool - the Deck-App of nextcloud - that helped me to not lose the big picture out of sight.
  </p>
)

export default StoryText
