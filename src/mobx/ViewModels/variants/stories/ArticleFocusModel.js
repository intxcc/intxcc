'use strict'

import DefaultModel from './DefaultModel'

const ArticleFocusModel = JSON.parse(JSON.stringify(DefaultModel))

ArticleFocusModel.guides['b'].deg = -30

export default ArticleFocusModel
