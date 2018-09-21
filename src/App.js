'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { values, keys } from 'mobx'
import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

import Router from './router/Router'

// Defines the fontawesome library with icons we want to use
import './fontawesome'

import View from './view/View'
import { StartpageView, StartpageOverlayView } from './view/StartpageView'
import { StoriesView, StoriesOverlayView } from './view/StoriesView'
import { ContactView, ContactOverlayView } from './view/ContactView'

import MenuComponent from './view/Components/MenuComponent'

const Views = {
  'stories': StoriesView,
  'startpage': StartpageView,
  'contact': ContactView
}

const OverlayViews = {
  'stories': StoriesOverlayView,
  'startpage': StartpageOverlayView,
  'contact': ContactOverlayView
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
  swapBuffer () {
    this.props.store.updateViewEntity('main', this.props.store.views.get('buffer').model)
    setTimeout(this.clearBuffer, 100)
  }

  @autobind
  clearBuffer () {
    this.props.store.updateViewEntity('buffer', '')
  }

  @autobind
  render () {
    const mainModelActive = this.props.store.views.get('main') && this.props.store.views.get('main').model !== ''
    const bufferModelActive = this.props.store.views.get('buffer') && this.props.store.views.get('buffer').model !== ''

    if (mainModelActive) {
      const mainTransitionState = this.props.store.views.get('main').transitionState

      if (mainTransitionState === 'swapBuffer' && bufferModelActive) {
        setTimeout(this.swapBuffer, 0)
      }
    }

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
          let buffer

          // If the view that is rendered here is the main view, a buffer view is present and the main view is in the morph stage, then give the buffer to the main view, so it is able to morph everything to the buffer
          if (key === 'main' && this.props.store.views.get('buffer') && (view.transitionState === 'morphing' || view.transitionState === 'fadeInBuffer')) {
            buffer = this.props.store.views.get('buffer')

            if (view.transitionState === 'fadeInBuffer') {
              // Change active page variable, for easier accessibility of that variable
              this.props.store.global.setActivePage(this.props.store.views.get('buffer').model)

              setTimeout(buffer.fadeIn, 0)
            }
          }

          const loadView = React.createElement(Views[view.model], {
            global: this.props.store.global,
            state: this.props.store.state[view.model],
            view: view
          })

          const loadOverlayView = React.createElement(OverlayViews[view.model], {
            global: this.props.store.global,
            state: this.props.store.state[view.model],
            view: view
          })

          // Variant of the model that is going to get rendered
          const modelVariant = view.modelVariant
          // Load model of the specific variant
          const viewModel = this.props.store.viewModels.get(view.model).variants.get(modelVariant)

          return (
            <View
              key={'view-' + key}
              className={'view-' + key}
              global={this.props.store.global}
              viewModel={viewModel}
              buffer={buffer}
              view={view}
              state={this.props.store.state[view.model]}
              loadedView={loadView}
              loadedOverlayView={loadOverlayView}>
            </View>
          )
        })}
        <MenuComponent selection={this.props.store.global.activePage} />
      </div>
    )
  }
}

App.propTypes = {
  store: PropTypes.object
}

export default App
