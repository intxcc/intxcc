'use strict'

import React from 'react'

const StoryText = (
  <p>
    At the beginning there was a problem: I played around with my arduino and some led strips and wanted them to &quot;move&quot; to the rythm of the music. In specific to change the color values and luminosity with the rhythm.<br />
    <br />
    To extract patterns from music there was already the python module <a target='_blank' rel='noopener noreferrer' href='https://aubio.org/'>aubio</a> (In specific energy based onset detection function) and because I like something straight-forward for this use case I decided to use python. To my surprise there was only a solution to record input streams in python, so after searching for better solutions I started to fork PyAudio with Portaudio, to make use of the <a target='_blank' rel='noopener noreferrer' href='https://docs.microsoft.com/de-de/windows/desktop/CoreAudio/loopback-recording'>AUDCLNT_STREAMFLAGS_LOOPBACK</a> flag in the Windows Audio Sesssion API (WASAPI).<br />
    <br />
    That was a really interesting project, because it was the first time I worked with code not written by myself and needed to understand it with only a very slim documentation. The most challenging part was to understand how the library works and how I can edit/extend the in C written code to make everything works as expected. After that I needed to learn how C bindings work with python to integrate everything in my forked module.<br />
    <br />
    This was one of the shorter projects, (1 to 3 days, without the time for maintenance) but one of the most challenging. I learned a lot and am far more comfortable with code I did not write myself.<br />
    <br />
    The project is licensed under the MIT license - like the projects I forked from - abd includes precompiled libraries. It is also still maintained by me with a good response time to issues. Around 100 unique visits are on its github page every week and it does have a good google rank.<br />
    <br />
    See <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/pyaudio_portaudio'>the project</a> on my <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/'>github page</a>.
  </p>
)

export default StoryText
