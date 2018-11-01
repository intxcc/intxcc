'use strict'

const ToolsColumn = {
  title: 'Tools',
  categories: [
    {
      title: 'Mediadesign',
      skills: [
        {
          title: 'Photoshop',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Adobe_Photoshop',
          desc: 'I like photographing, so its on my tool list for quite a while. When designing I use mostly vector graphics, but once in a while photoshop gets its place in the toolchain.'
        }, {
          title: 'Inkscape',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Inkscape',
          trivia: 'The design for this website was created in Inkscape.'
        }, {
          title: 'Illustrator',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Adobe_Illustrator',
          trivia: 'I\'m also not a big fan of almost monopolistic software companies, but Adobe just makes good tools.'
        }, {
          title: 'Blender',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Blender_(software)',
          trivia: 'The video on the startpage (if you are not on a small display) was created with Blender.'
        }, {
          title: 'Premiere Pro',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Adobe_Premiere_Pro',
          trivia: 'To make it look glitchier the video on the startpage got a few effects from Premiere Pro.'
        }, {
          title: 'After Effects',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/Adobe_After_Effects'
        }
      ]
    }, {
      title: 'Development',
      skills: [
        {
          title: 'Visual Studio Code',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Visual_Studio_Code',
          desc: 'Moved from Dreamweaver to Brackets, then to [Link|skill|Atom] and now to Visual Studio Code.',
          trivia: 'Was critical at first, because it is developed by Microsoft, but it is Open Source and Microsoft is loosening up a bit on its proprietary worldview lately, it seems.'
        }, {
          title: 'Atom',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/Atom_(text_editor)'
        }, {
          title: 'Yarn',
          mark: 2,
          trivia: 'More information [Link|extern|here|https://yarnpkg.com/lang/en/].'
        }, {
          title: 'NPM',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Npm_(software)'
        }, {
          title: 'IntelliJ',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/IntelliJ_IDEA',
          desc: 'I have never had such a nice developing experience like IntelliJ and Java. Eclipse is cool and all, but even though I\'m a fan of Open Source at the end of the day it is most important for me what I can work with.',
          trivia: 'Have never used [Link|Skill|Visual Studio Code] with Java though. I would give that a try the next time I work on a Java project.'
        }
      ]
    }, {
      title: 'Version CS',
      skills: [
        {
          title: 'GitHub',
          mark: 3,
          wikiLink: 'https://en.wikipedia.org/wiki/GitHub',
          trivia: 'The full source code of this website can be found on my [Link|extern|GitHub profile|https://github.com/intxcc].'
        }, {
          title: 'Git',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Git'
        }, {
          title: 'Subversion',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/Apache_Subversion'
        }
      ]
    }, {
      title: 'Others',
      skills: [
        {
          title: 'LaTeX',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/LaTeX',
          desc: 'It just looks really pretty and professional. I do everything that is a static document in LaTeX.',
          trivia: '«It just looks really pretty and professional.» - Me'
        }, {
          title: 'Bash',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Bash_(Unix_shell)'
        }, {
          title: 'Cygwin',
          mark: 2,
          wikiLink: 'https://en.wikipedia.org/wiki/Cygwin',
          desc: 'Before WSL (Windows Subsystem for Linux) came around and I did not want to miss Linux while working on Windows I used Cygwin a lot.'
        }, {
          title: 'PowerShell',
          mark: 1,
          wikiLink: 'https://en.wikipedia.org/wiki/PowerShell'
        }
      ]
    }
  ]
}

export default ToolsColumn
