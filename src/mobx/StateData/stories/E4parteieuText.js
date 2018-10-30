'use strict'

import React from 'react'

const StoryText = (
  <p>
    The infrastructure consisted of a debian root server with a <a target='_blank' rel='noopener noreferrer' href='https://rocket.chat/'>Rocket.Chat</a> and <a target='_blank' rel='noopener noreferrer' href='https://github.com/ether/etherpad-lite'>Etherpad</a> instance. We moved from a proprietary collaborative platform to using open source software, as transparency was important. All customized for an integrated user management and forced https, using a certificate from <a target='_blank' rel='noopener noreferrer' href='https://letsencrypt.org/'>Let&apos;s Encrypt</a>.<br />
    <br />
    Also there needed to be a poll platform adjusted to our needs, which I build from scratch using <a href='/#/skills/skill/reactjs'>ReactJS</a>, <a href='/#/skills/skill/mysql'>MySQL</a> and <a href='/#/skills/skill/django'>Django</a> in consensus with all moderators.<br />
    <br />
    As the community came from reddit and we wanted to prevent trolling, I implemented an authentication with the reddit API, that excluded everybody with a new account. Only later on we did want to loosen up on this rule.<br />
    <br />
    The platform written from scratch was primary a polling platform. I tried to developed a method to make polls cryptographically replicable, using hashes everybody could (theoretically) verify, nowadays I would probably use a blockchain approach for that.<br />
    <br />
    The editor for polls (before they were published) was also collaborative. That was made possible through communication channels using <a href='/#/skills/skill/websocket'>WebSocket</a> and <a href='/#/skills/skill/redis'>Redis</a> that made the frontend capable of synchronizing in real time like Etherpad does. The same channels were also used to create a notification system.<br />
    <br />
    Sadly the project lost activity about one or two months later and I shut the server down due to lack of funding.<br />
    <br />
    A working backup does exist.
  </p>
)

export default StoryText
