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
          trivia: 'This webpage is provided by nginx. Thank nginx, not me.'
        }, {
          title: 'NodeJS',
          mark: 2
        }, {
          title: 'Apache2',
          mark: 2
        }
      ]
    }, {
      title: 'Database',
      skills: [
        {
          title: 'MySQL',
          mark: 3,
          desc: 'For the most part the main database I use. Lately I try to use more [Link|skill|MongoDB], if it has an advantage.'
        }, {
          title: 'MongoDB',
          mark: 2
        }, {
          title: 'Redis',
          mark: 2
        }
      ]
    }, {
      title: 'Communication',
      skills: [
        {
          title: 'Dovecot',
          mark: 2,
          desc: 'I run my own mail server, for convenience and privacy reasons. That is what I use Dovecot and [Link|skill|Postfix] for. Thunderbird is the client I use when at my own computer.'
        }, {
          title: 'ejabberd',
          mark: 2,
          desc: 'I like to use my own server to communicate via Jabber/XMPP. Also because that protocol supports OTR.',
          trivia: 'The bad part of Jabber/XMPP is, that nobody uses it.'
        }, {
          title: 'Postfix',
          mark: 1,
          desc: 'See [Link|skill|Dovecot].'
        }, {
          title: 'Nextcloud',
          mark: 1,
          desc: 'My privacy is really important for me, that is why I host my own cloud, where I organize some parts of my life, like appointments, tasks, notes, contacts and the Deck-App. Also great: The nice android and thunderbird integration.'
        }, {
          title: 'Roundcube',
          mark: 1,
          desc: 'I host roundcube as webmail for emergencys, where I can\'t use my own computer.'
        }
      ]
    }, {
      title: 'Security',
      skills: [
        {
          title: 'Securing user data',
          mark: 3
        }, {
          title: 'XSRF',
          mark: 3
        }, {
          title: 'HSTS',
          mark: 3
        }, {
          title: 'TLS',
          mark: 3
        }, {
          title: 'CORS',
          mark: 2
        }, {
          title: 'XSS',
          mark: 2
        }, {
          title: 'SQLi',
          mark: 2
        }, {
          title: 'iptables',
          mark: 1
        }
      ]
    }
  ]
}

export default AdminColumn
