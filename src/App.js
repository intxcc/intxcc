'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { values, keys } from 'mobx'
import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

import Router from './router/Router'

import Logo from './logo/Logo'

import View from './view/View'
import { StartpageView, StartpageOverlayView } from './view/StartpageView'
import { StoriesView, StoriesOverlayView } from './view/StoriesView'

const Views = {
  'stories': StoriesView,
  'startpage': StartpageView
}

const OverlayViews = {
  'stories': StoriesOverlayView,
  'startpage': StartpageOverlayView
}

@observer
class App extends React.Component {
  componentDidMount () {
    this.router = new Router(this.props.store)

    window.addEventListener('resize', this.updateDimensions)
    window.addEventListener('hashchange', this.router.onHashChange, false)

    this.updateDimensions()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
    window.removeEventListener('hashchange', this.router.onHashChange, false)
  }

  @autobind
  updateDimensions () {
    const siteWrapper = this.siteWrapper
    const global = this.props.store.global

    global.setClientDimensions(siteWrapper.clientWidth, siteWrapper.clientHeight)
  }

  @autobind
  render () {
    const mainModelActive = this.props.store.views.get('main') && this.props.store.views.get('main').model !== ''

    let logo = ''
    if (mainModelActive) {
      logo = (
        <Logo className={this.props.store.viewModels.get(this.props.store.views.get('main').model).logoClassName} />
      )
    }

    return (
      <div
        className='site-wrapper'
        ref={ (siteWrapper) => { this.siteWrapper = siteWrapper }} >
        {logo}
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

          const loadOverlayView = React.createElement(OverlayViews[view.model], {
            global: this.props.store.global,
            view: view
          })

          return (
            <View
              key={'view-' + key}
              className={'view-' + key}
              global={this.props.store.global}
              viewModel={this.props.store.viewModels.get(view.model)}
              view={view}
              loadedView={loadView}
              loadedOverlayView={loadOverlayView}>
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
