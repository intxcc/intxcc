'use strict'

import DefaultModel from './DefaultModel'

const ArticleFocusModel = JSON.parse(JSON.stringify(DefaultModel))

ArticleFocusModel.className = 'variant--article-focus'
ArticleFocusModel.guides['a'].deg = 0
ArticleFocusModel.guides['b'].deg = -13
ArticleFocusModel.guides['c'].deg = -120
ArticleFocusModel.guides['d'].deg = -120

export default ArticleFocusModel
