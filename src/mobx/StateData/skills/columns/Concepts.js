'use strict'

const ConceptsColumn = {
  title: 'Concepts',
  categories: [
    {
      title: 'Code',
      skills: [
        {
          title: 'Coding Style Guides',
          mark: 3,
          desc: 'I like standards, because It keeps me from learning ways, that only work for me. So even though this page was developed only by myself I\'m strictly using [Link|skill|Standard JS].'
        }, {
          title: 'DRY',
          mark: 3,
          trivia: '"Don\'t repeat yourself"'
        }, {
          title: 'KISS',
          mark: 3,
          trivia: '"Keep It Simple, Stupid"'
        }, {
          title: 'RESTful',
          mark: 3,
          desc: 'In my experience RESTful APIs are straight forward and integrate well with most languages. So up to now, I exclusively used them.'
        }, {
          title: 'Reusable Components',
          mark: 2,
          desc: 'I don\' think there is much to say, why this is a good idea. I was e.g. happy to use the skills map on mobile devices and desktops. And thanks to the structure, I would be able to use it in a new project as well, if I have the urge for it.'
        }
      ]
    }, {
      title: 'Design',
      skills: [
        {
          title: 'Responsive Design',
          mark: 2,
          desc: 'I think it\'s pretty straight forward, that this is a good idea. This page is responsive and still uses two seperated view models with a uniform state model. The seperated view models were neccessary to not be forced to compromise on design choices on mobile or desktop.'
        }, {
          title: 'Material Design',
          mark: 2
        }
      ]
    }, {
      title: 'Model',
      skills: [
        {
          title: 'Agile',
          mark: 2
        }, {
          title: 'Scrum',
          mark: 1
        }
      ]
    }
  ]
}

export default ConceptsColumn
