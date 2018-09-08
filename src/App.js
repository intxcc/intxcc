'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { values, keys } from 'mobx'
import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

import View from './view/View'
import StartpageView from './view/StartpageView'
import StoriesView from './view/StoriesView'

const Views = {
  'stories': StoriesView,
  'startpage': StartpageView
}

@observer
class App extends React.Component {
  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)

    this.updateDimensions()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
  }

  @autobind
  updateDimensions () {
    const siteWrapper = this.siteWrapper
    const global = this.props.store.global

    global.setClientDimensions(siteWrapper.clientWidth, siteWrapper.clientHeight)
  }

  @autobind
  render () {
    return (
      <div
        className='site-wrapper'
        ref={ (siteWrapper) => { this.siteWrapper = siteWrapper }} >
        {values(this.props.store.views).map((view, index) => {
          // Don't render empty views.
          if (view.model === '') {
            return
          }

          const key = keys(this.props.store.views)[index]

          const loadView = React.createElement(Views[view.model], {
            global: this.props.store.global,
            view: view
          })

          return (
            <View
              key={'view-' + key}
              className={'view-' + key}
              global={this.props.store.global}
              viewModel={this.props.store.viewModels.get(view.model)}
              view={view}>
              {loadView}
            </View>
          )
        })}
      </div>
    )
  }
}

App.propTypes = {
  store: PropTypes.object
}

export default App
