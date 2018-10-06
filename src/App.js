'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { values, keys } from 'mobx'
import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

// Defines the fontawesome library with icons we want to use
import './fontawesome'

import View from './view/View'
import { StartpageView, StartpageOverlayView } from './view/StartpageView'
import { AboutView, AboutOverlayView } from './view/AboutView'
import { StoriesView, StoriesOverlayView } from './view/StoriesView'
import { ContactView, ContactOverlayView } from './view/ContactView'
import { SkillsView, SkillsOverlayView } from './view/SkillsView'

import MenuComponent from './view/Components/MenuComponent'

import subscribeToRouterParams from './mobx/StateModels/functions/subscribeToRouterParams'

const Views = {
  'startpage': StartpageView,
  'about': AboutView,
  'stories': StoriesView,
  'skills': SkillsView,
  'contact': ContactView
}

const OverlayViews = {
  'startpage': StartpageOverlayView,
  'about': AboutOverlayView,
  'stories': StoriesOverlayView,
  'skills': SkillsOverlayView,
  'contact': ContactOverlayView
}

@observer
class App extends React.Component {
  constructor (props) {
    super(props)

    this.disposers = {}
  }

  componentDidMount () {
    window.addEventListener('resize', this.updateDimensions)
    window.addEventListener('hashchange', this.props.store.router.onHashChange, false)

    this.updateDimensions()

    this.props.store.router.initialize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions)
    window.removeEventListener('hashchange', this.props.store.router.onHashChange, false)
  }

  @autobind
  updateDimensions () {
    const siteWrapper = this.siteWrapper
    const global = this.props.store.global

    global.setClientDimensions(siteWrapper.clientWidth, siteWrapper.clientHeight)
  }

  @autobind
  swapBuffer () {
    if (this.props.store.views.get('main').stateBasicInfo) {
      this.props.store.views.get('main').stateBasicInfo.clearNotPersistentPopups()
    }

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

    if (mainModelActive) {
      const mainTransitionState = this.props.store.views.get('main').transitionState

      const bufferModelActive = this.props.store.views.get('buffer') && this.props.store.views.get('buffer').model !== ''
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
              // Change active page variable, for easier accessibility of that variable. Do that at the end of the event loop, as we shouldn't change state during a state transition
              setTimeout(() => this.props.store.global.setActivePage(this.props.store.views.get('buffer').model), 0)
              setTimeout(buffer.fadeIn, 0)
            }
          }

          // Forward router params to the responsible state or null to indicate, that the state should no longer update based on the router params
          let routerParams = this.props.store.router.params
          if (view.model === this.props.store.router.model) {
            routerParams = this.props.store.router.params
          } else {
            routerParams = null
          }

          // Check if the responsible state does have a function to receive router params and forward them
          if (this.props.store.state[view.model].onRouterParamChange) {
            if (routerParams !== null) {
              // Only add disposers if there are none, which means no subscription inside of the state
              if (!this.disposers[view.model] || this.disposers[view.model].length <= 0) {
                this.disposers[view.model] = []

                // Save the disposer to delete the subscription from the state to the router parameters, when the current model changes
                this.disposers[view.model].push(subscribeToRouterParams(routerParams, this.props.store.state[view.model].onRouterParamChange))
              }
            } else {
              if (this.disposers[view.model]) {
                for (let disposer of this.disposers[view.model]) {
                  // Dispose of all subscriptions of states that do not represent the current path
                  disposer()
                }

                // Clear disposers
                this.disposers[view.model] = []
              }
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
              isMainView={key === 'main'}
              key={'view-' + key}
              className={'view-' + key}
              rootStore={this.props.store}
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
