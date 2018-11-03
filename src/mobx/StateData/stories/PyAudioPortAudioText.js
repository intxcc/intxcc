'use strict'

import React from 'react'

const StoryText = (
  <p>
    In the beginning there was a problem: I played around with my arduino and some led strips and wanted them to &quot;move&quot; to the rythm of the music. Particularly to change the color values and luminosity with the rhythm.<br />
    <br />
    To extract patterns from music there was already the python module <a target='_blank' rel='noopener noreferrer' href='https://aubio.org/'>aubio</a> (in particular the energy based onset detection function) and because I wanted something straight-forward for this use case I decided to use python in the whole project.<br />
    <br />
    To my surprise the only solutions I found, were to record input streams, like the microphone, in python. But I wanted something universally working for all applications playing music. So I needed to find a way to record the output stream going to the speakers. With that stream one could record a few milliseconds and apply the onset detection function to it.<br />
    <br />
    After searching but not finding a better solution, I started to fork PyAudio with Portaudio, to make use of the <a target='_blank' rel='noopener noreferrer' href='https://docs.microsoft.com/windows/desktop/CoreAudio/loopback-recording'>AUDCLNT<i>[...]</i>LOOPBACK</a> flag in the Windows Audio Session API (WASAPI).<br />
    <br />
    That was a really interesting project, because it was the first time I worked in-depth with code not written by myself and needed to understand it with only a very slim documentation. The most challenging part was to understand how the portaudio library works and how I can edit/extend the in C written code to make everything work as expected. After that I learned how C bindings worked with python, extended the PyAudio module to work with my portaudio fork and integrated and documented everything to get a finished module.<br />
    <br />
    This was one of the shorter projects, (1 to 3 days, without the time for maintenance) but one of the most challenging. I learned a lot and am now far more comfortable with code I did not write myself.<br />
    <br />
    The project is licensed under the MIT license - like the projects I forked from - and includes precompiled libraries. It is also still maintained with a good response time to issues and I merged some changes from the forks of my repository. Its GitHub page has around 100 unique visits every week with a good google rank.<br />
    <br />
    In conclusion I created a repository that did not only solve my problem but the problem of a lot of people. And my arduino-pyaudio-portaudio led strips work like a charm.<br />
    <br />
    See <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/pyaudio_portaudio'>the project</a> on my <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/'>GitHub page</a>.
  </p>
)

export default StoryText
