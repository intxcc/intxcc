import DefaultModel from './variants/skills/DefaultModel'
import StoriesFilterFocusModel from './variants/skills/StoriesFilterFocusModel'

// This is the ViewModel of the skills page

const ViewModel = {
  name: 'skills',
  variants: {
    'default': DefaultModel,
    'StoriesFilterFocusModel': StoriesFilterFocusModel
  }
}

export default ViewModel
