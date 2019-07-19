'use strict'

const LanguagesColumn = {
  title: 'Languages',
  categories: [
    {
      title: 'HTML',
      skills: [
        {
          title: 'HTML',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/HTML'
        }, {
          title: 'CSS3',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Cascading_Style_Sheets#CSS_3'
        }, {
          title: 'SCSS',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Sass_(stylesheet_language)'
        }, {
          title: 'HTML5',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/HTML5'
        }
      ]
    }, {
      title: 'JavaScript',
      skills: [
        {
          title: 'JavaScript',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/JavaScript'
        }, {
          title: 'Standard JS',
          mark: 3,
          trivia: 'More information [Link|extern|here|https://standardjs.com/].'
        }, {
          title: 'ES6',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015',
          trivia: 'ES6 really made my life easier. Glad that babel does exist to transpile ES6 to ES5 for compatibility.'
        }, {
          title: 'ReactJS',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/React_(JavaScript_library)',
          trivia: 'Yep, I\'d say I love ReactJS. But don\'t worry, I won\'t be mad if you hang around with it as well.'
        }, {
          title: 'MobX',
          mark: 3,
          desc: 'Including MST (MobX state tree).',
          trivia: 'This site uses MobX 4 (LTS) for compatibility. More information [Link|extern|here|https://mobx.js.org/].'
        }, {
          title: 'jQuery',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/JQuery'
        }, {
          title: 'Canvas',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Canvas_element'
        }, {
          title: 'Redux',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Redux_(JavaScript_library)'
        }, {
          title: 'Babel',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Babel_(compiler)'
        }, {
          title: 'WebSocket',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/WebSocket',
          trivia: '[Link|skill|JavaScript] specific information [Link|extern|here|https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API]'
        }, {
          title: 'Mongoose',
          mark: 2,
          trivia: 'More information [Link|extern|here|https://mongoosejs.com/].'
        }, {
          title: 'Webpack 4',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Webpack'
        }, {
          title: 'Express',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/Express.js'
        }, {
          title: 'Gulp',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/Gulp.js'
        }, {
          title: 'React Native',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/React_(JavaScript_library)#React_Native'
        }, {
          title: 'ThreeJS',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/Three.js'
        }
      ]
    }, {
      title: 'Python',
      skills: [
        {
          title: 'Python',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Python_(programming_language)'
        }, {
          title: 'Django',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Django_(web_framework)'
        }
      ]
    }, {
      title: 'Java',
      skills: [
        {
          title: 'Java',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Java_(programming_language)'
        }, {
          title: 'Android Development',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Android_software_development'
        }, {
          title: 'Kotlin',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/Kotlin_(programming_language)'
        }
      ]
    }, {
      title: 'Others',
      skills: [
        {
          title: 'C',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/C_(programming_language)',
          desc: 'I really like C. It\'s tiny and beautiful. If you don\'t watch your step you will shoot yourself in the foot, but it is very fast and can be used for developing without high complexities (in the language itself) of languages like [Link|skill|ES6] or [Link|skill|Python].',
          trivia: 'I would never ever use it though to write a server application. Too many pitfalls and everybody makes mistakes. Rust is on my to-learn-list, which fixes some of them.'
        }, {
          title: 'PHP',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/PHP',
          desc: 'In the beginning I used a lot PHP, as I thought it was industry standard, like Photoshop is for photo editing. Nowadays I use more [Link|skill|Python] or [Link|skill|ES6] on the server side.'
        }, {
          title: 'C++',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/C%2B%2B'
        }, {
          title: 'MIPS Assembly',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/MIPS_architecture',
          desc: 'Had it in university. Was really fun to learn how to write programs with it and how it gives you this very precise control of what the CPU should do.',
          trivia: 'Once you\'re in the flow, it\'s not even that hard to use it.'
        }
      ]
    }
  ]
}

export default LanguagesColumn
