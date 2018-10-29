'use strict'

const LanguagesColumn = {
  title: 'Languages',
  categories: [
    {
      title: 'HTML',
      skills: [
        {
          title: 'HTML',
          mark: 3
        }, {
          title: 'CSS3',
          mark: 3
        }, {
          title: 'SCSS',
          mark: 3
        }, {
          title: 'HTML5',
          mark: 2
        }
      ]
    }, {
      title: 'JavaScript',
      skills: [
        {
          title: 'JavaScript',
          mark: 3
        }, {
          title: 'Standard JS',
          mark: 3
        }, {
          title: 'ES6',
          mark: 3,
          trivia: 'ES6 really made my life easier. Glad that babel does exist to transpile ES6 to ES5 for compatibility reasons.'
        }, {
          title: 'ReactJS',
          mark: 3,
          trivia: 'Yep, I\'d say I love ReactJS. But don\'t worry, I won\'t be mad if you hang around with it as well.'
        }, {
          title: 'MobX',
          mark: 3,
          desc: 'Including MST (MobX state tree).'
        }, {
          title: 'Canvas',
          mark: 2
        }, {
          title: 'Redux',
          mark: 2
        }, {
          title: 'Babel',
          mark: 2
        }, {
          title: 'jQuery',
          mark: 2
        }, {
          title: 'WebSocket',
          mark: 2
        }, {
          title: 'Mongoose',
          mark: 2
        }, {
          title: 'Webpack 4',
          mark: 2
        }, {
          title: 'Express',
          mark: 1
        }, {
          title: 'Gulp',
          mark: 1
        }, {
          title: 'React Native',
          mark: 1
        }, {
          title: 'ThreeJS',
          mark: 1
        }
      ]
    }, {
      title: 'Python',
      skills: [
        {
          title: 'Python',
          mark: 2
        }, {
          title: 'Django',
          mark: 3
        }
      ]
    }, {
      title: 'Java',
      skills: [
        {
          title: 'Java',
          mark: 2
        }, {
          title: 'Android Development',
          mark: 3
        }, {
          title: 'Kotlin',
          mark: 1
        }
      ]
    }, {
      title: 'Others',
      skills: [
        {
          title: 'C',
          mark: 3,
          desc: 'I really like C. It\'s tiny and beautiful. If you don\'t watch your step you will shoot yourself in the foot, but it\'s very performant and can be used for developing without high complexities (in the language itself) of languages like [Link|skill|ES6] or [Link|skill|Python].',
          trivia: 'I would never ever use it though to write a server application. Too many pitfalls and everybody makes mistakes. Rust is on my to-learn-list though, which fixes some of them.'
        }, {
          title: 'C++',
          mark: 2
        }, {
          title: 'MIPS',
          mark: 2,
          desc: 'Had it at university. Was really fun to learn how to write programs with it and how it gives you this very precise control of what the CPU should do.',
          trivia: 'Once you\'re in the flow, it not even that hard to use it.'
        }, {
          title: 'PHP',
          mark: 2,
          desc: 'In the beginning I used a lot PHP, as I thought it was industry standard, like Photoshop is for photo editing. Nowadays I use more [Link|skill|Python] or [Link|skill|ES6] on the server side.'
        }
      ]
    }
  ]
}

export default LanguagesColumn
