'use strict'

const AdminColumn = {
  title: 'Admin',
  categories: [
    {
      title: 'Webserver',
      skills: [
        {
          title: 'nginx',
          mark: 3
        }, {
          title: 'NodeJS'
        }, {
          title: 'Apache2'
        }
      ]
    }, {
      title: 'Database',
      skills: [
        {
          title: 'MySQL'
        }, {
          title: 'MongoDB'
        }, {
          title: 'Redis'
        }
      ]
    }, {
      title: 'Communication',
      skills: [
        {
          title: 'Dovecot'
        }, {
          title: 'ejabberd'
        }, {
          title: 'Postfix'
        }, {
          title: 'Roundcube'
        }
      ]
    }, {
      title: 'Security',
      skills: [
        {
          title: 'Securing user data'
        }, {
          title: 'XSRF'
        }, {
          title: 'HSTS'
        }, {
          title: 'TLS'
        }, {
          title: 'CORS'
        }, {
          title: 'XSS'
        }, {
          title: 'SQLi'
        }, {
          title: 'iptables'
        }
      ]
    }
  ]
}

export default AdminColumn
