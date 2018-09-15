import DefaultModel from './variants/stories/DefaultModel'
import ArticleFocusModel from './variants/stories/ArticleFocusModel'

// This is the ViewModel of the stories view

const ViewModel = {
  name: 'stories',
  variants: {
    'default': DefaultModel,
    'ArticleFocusModel': ArticleFocusModel
  }
}

export default ViewModel
