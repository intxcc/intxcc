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
          wikiLink: 'https://en.wikipedia.org/wiki/Programming_style',
          desc: 'I like standards, because it keeps me from learning ways, that only work for me. So even though this page was developed only by myself I\'m strictly using [Link|skill|Standard JS].'
        }, {
          title: 'DRY',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Don\'t_repeat_yourself',
          trivia: '"Don\'t repeat yourself"'
        }, {
          title: 'KISS',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/KISS_principle',
          trivia: '"Keep It Simple, Stupid"'
        }, {
          title: 'RESTful',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Representational_state_transfer',
          desc: 'In my experience RESTful APIs are straight forward and integrate well with most languages.',
          trivia: 'Up to now, I exclusively used RESTful APIs.'
        }, {
          title: 'Reusable Components',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Reusability',
          desc: 'I don\'t think there is much to say, as to why this is a good idea. I was for example happy to use the skills map on mobile devices and desktops. And thanks to the structure, I would be able to use it in a new project as well, if I have the urge for it.'
        }
      ]
    }, {
      title: 'Design',
      skills: [
        {
          title: 'Responsive Design',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Responsive_web_design',
          desc: 'I think it\'s pretty straight forward, that this is a good idea. This website is responsive and still uses two seperated view models with a uniform state model.',
          trivia: 'The seperated view models of this website were neccessary to not be forced to compromise on design choices on the mobile or desktop version.'
        }, {
          title: 'Material Design',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Material_Design'
        }
      ]
    }, {
      title: 'Model',
      skills: [
        {
          title: 'Agile',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Agile_software_development'
        }, {
          title: 'Scrum',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/Scrum_(software_development)'
        }
      ]
    }
  ]
}

export default ConceptsColumn
