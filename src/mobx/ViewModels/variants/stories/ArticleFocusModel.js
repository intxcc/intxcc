'use strict'

import DefaultModel from './DefaultModel'

/** This model is active, when the article is in focus, to not overlay the content with the headline, we just use a quite small sticky header. */
const ArticleFocusModel = JSON.parse(JSON.stringify(DefaultModel))

ArticleFocusModel.className = 'variant--article-focus'
ArticleFocusModel.guides['a'].deg = 0
ArticleFocusModel.guides['b'].deg = -13
ArticleFocusModel.guides['c'].deg = -120
ArticleFocusModel.guides['d'].deg = -120

const transparent = 'rgba(0,0,0,0)'

ArticleFocusModel.polygons['A_WhiteStroke_Outer'].stroke = transparent
ArticleFocusModel.polygons['B_WhiteStroke_Outer'].stroke = transparent

ArticleFocusModel.polygons['A'].fill = transparent
ArticleFocusModel.polygons['A'].stroke = transparent

ArticleFocusModel.polygons['B'].fill = transparent
ArticleFocusModel.polygons['B'].stroke = transparent

ArticleFocusModel.polygons['C'].fill = transparent
ArticleFocusModel.polygons['C'].stroke = transparent

ArticleFocusModel.polygons['D'].fill = transparent
ArticleFocusModel.polygons['D'].stroke = transparent

export default ArticleFocusModel
