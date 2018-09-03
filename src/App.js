'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { values } from 'mobx'
import { observer } from 'mobx-react'

import View from './view/View'

const App = observer(props => (
  <div>
    {values(props.store.views).map((view, index) => (
      <View key={'view-' + index} view={view} />
    ))}
  </div>
))

App.propTypes = {
  store: PropTypes.object
}

export default App
