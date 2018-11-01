'use strict'

const AdminColumn = {
  title: 'Admin',
  categories: [
    {
      title: 'Webserver',
      skills: [
        {
          title: 'nginx',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Nginx',
          desc: 'A fast and reliable server. I like it over [Link|skill|Apache2] because of the minimalistic approach.',
          trivia: 'This webpage is provided by nginx. Thank nginx, not me.'
        }, {
          title: 'NodeJS',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Node.js'
        }, {
          title: 'Apache2',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Apache_HTTP_Server'
        }
      ]
    }, {
      title: 'Database',
      skills: [
        {
          title: 'MySQL',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/MySQL',
          desc: 'For the most part the main database I use. Lately I try to use more [Link|skill|MongoDB], if it has an advantage.'
        }, {
          title: 'MongoDB',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/MongoDB'
        }, {
          title: 'Redis',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Redis'
        }
      ]
    }, {
      title: 'Communication',
      skills: [
        {
          title: 'Tor',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Tor_(anonymity_network)',
          desc: 'Tor formerly known as "The Onion Routing". I was the creator and administrator of a [Link|story|lawful Tor hidden service|story-thehackcamporg].'
        }, {
          title: 'DNS',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Domain_Name_System',
          desc: 'I manage the DNS-records for intx.cc and marvinruell.de myself. I use spf-records to prevent others faking the sender of an email with my domain names, since I got numerous bounce mails that were not coming from my IP-address.',
          trivia: '"Domain Name System"'
        }, {
          title: 'Dovecot',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Dovecot_(software)',
          desc: 'I run my own mail server, for convenience and privacy reasons. That is what I use Dovecot and [Link|skill|Postfix] for. Thunderbird is the client I use when at my own computer.'
        }, {
          title: 'ejabberd',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Ejabberd',
          desc: 'I like to use my own server to communicate via Jabber/XMPP. Also because that protocol supports OTR.',
          trivia: 'The bad part of Jabber/XMPP is, that nobody uses it.'
        }, {
          title: 'Postfix',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/Postfix_(software)',
          trivia: 'See [Link|skill|Dovecot].'
        }, {
          title: 'Nextcloud',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/Nextcloud',
          desc: 'My privacy is really important for me, that is why I host my own cloud, where I organize some parts of my life, like appointments, tasks, notes and contacts. To organize the steps for this website I used the Deck-App.',
          trivia: 'Also great: The nice android and thunderbird integration.'
        }, {
          title: 'Roundcube',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/Roundcube',
          desc: 'I host roundcube as webmail for emergencys, where I can\'t use my own computer.'
        }
      ]
    }, {
      title: 'Security',
      skills: [
        {
          title: 'Securing user data',
          mark: 3,
          desc: 'I value my own privacy, so it is important for me to respect the privacy of my users as well. No password is saved or sent in plain text.',
          trivia: 'I also go great lengths to disassemble all theoretical attack vectors known to me on a user. Like [Link|skill|XSS], [Link|skill|SQLi], [Link|skill|XSRF], etc.'
        }, {
          title: 'XSRF',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Cross-site_request_forgery',
          trivia: '"Cross-site request forgery"'
        }, {
          title: 'HSTS',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security',
          trivia: '"HTTP Strict Transport Security"'
        }, {
          title: 'TLS',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Transport_Layer_Security',
          trivia: '"Transport Layer Security"'
        }, {
          title: 'CORS',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Cross-origin_resource_sharing',
          trivia: '"Cross-origin resource sharing"'
        }, {
          title: 'XSS',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Cross-site_scripting',
          trivia: '"Cross-site scripting"'
        }, {
          title: 'SQLi',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/SQL_injection',
          trivia: '"SQL injection"'
        }, {
          title: 'iptables',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/Iptables'
        }
      ]
    }
  ]
}

export default AdminColumn
