'use strict'

import React from 'react'

const StoryText = (
  <p>
    <h3>This is about the server: Information about the website <a href='/#/stories/story-intxcc'>here</a>.</h3><br />
    I rented that server in autumn 2014 and it has done a great job so far. It is maintained very strictly and updated in a reasonable interval. I learned a lot about security in the past and try to apply everthing to this server.<br />
    <br />
    Https is forced. <a href='/#/skills/skill/roundcube'>Roundcube</a> and various other admin sites are behind a HTTP-Authentication, just in case there is a bug in one of the login screens. <a href='/#/skills/skill/iptables'>Iptables</a> is set up with a very strict ruleset, also there are as few daemons running as possible, while not beeing too restrictive. The <a href='/#/skills/skill/mysql'>MySQL</a> service is only reachable from localhost and has strictly seperated databases for each purpose.<br />
    <br />
    The certificate comes from <a target='_blank' rel='noopener noreferrer' href='https://letsencrypt.org/'>Let&apos;s Encrypt</a> and are updated every month via a cron job. The renewal is done by my own customized fork of <a target='_blank' rel='noopener noreferrer' href='https://github.com/intxcc/acme-tiny'>acme-tiny</a>, that has it&apos;s own user and very strict file rights. The server has a lot of DNS aliases, so it might be useful to update to the rather new Let&apos;s Encrypt Wildcard certificates, but that client would probably be far bigger than acme-tiny. So as long as it is not really needed <i>acme-tiny</i> does a great job. I already created a simple file to copy-paste, for adding new subdomains with ease.<br />
    <br />
    Apart from that the server also runs an <a href='/#/skills/skill/ejabberd'>ejabberd</a> instance that is useful sometimes, but sadly the Jabber/XMPP protocol is not really widespread.
  </p>
)

export default StoryText
