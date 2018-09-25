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
          desc: 'For the most part the main database I use. Lately I try to use more MongoDB, if it has an advantage.'
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
          mark: 2
        }, {
          title: 'ejabberd',
          mark: 2
        }, {
          title: 'Postfix',
          mark: 1
        }, {
          title: 'Roundcube',
          mark: 1
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
