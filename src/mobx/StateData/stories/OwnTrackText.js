'use strict'

import React from 'react'

const StoryText = (
  <p>
    I got the main idea, when my smartphone was stolen, but I disabled all tracking services for privacy reasons. Because I did not want google to track my position, to get my smatphone back if it would be stolen again I developed my own solution. This solution should come without strings attached to any second or third parties. All data stays on the devices of the users, that use this app at all times. The android app and the software environment to make it work are licensed as free software.<br />
    <br />
    The server works with Openstreetmap, without disclosing the position information even to this service, used to visualize the data. That was one of the hardest parts to implement, but I found a way that satisfied me.<br />
    <br />
    The server part receiving tracking data from the app is a very slim self hosted and open source PHP script to minimize any attack vectors.<br />
    <br />
    The server part that visualizes the data is a python script. It reads the position data of a given timeframe from the database and calculates which tile of the map we need to download to illustrate them. We download this tile of the map via the Openstreetmap API and do some math magic to calculate where to draw the dots on the map (the script downloads the map tile as png and draws on it using ImageDraw). The data never leaves this python script and the device its running on. The only thing Openstreetmap would know is the very very rough area one was in, as it would be an overkill to download the complete map.<br />
    <br />
    <i>
      If you are interested, <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/OwnTrack/blob/master/server/private/draw_map.py#L11'>here</a> the points are calculated.
    </i><br />
    <br />
    As you can imagine this app is not very popular. (Currently 3 stars and 2 forks on GitHub.) That is of course, because it has only a limited use case and one needs knowledge about how to run a server to make use of it.<br />
    <br />
    To make it useful for a broader audience I documented the project itself and the code really well. Even made a <a target='_blank' rel='noopener noreferrer' href='https://www.youtube.com/watch?v=RQiMUfzfB94'>youtube tutorial</a>. A Step-by-Step guide from setting up an ubuntu server to a working instance of the OwnTrack backend.<br />
    <br />
    Since this project I have a google developer license to upload my own apps to the google playstore.<br />
    <br />
    See <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/OwnTrack/'>the project</a> with <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/OwnTrack/#latest-screenshots'>screenshots</a> on my <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/'>GitHub page</a>.
  </p>
)

export default StoryText
