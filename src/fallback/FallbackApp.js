'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

import subscribeToRouterParams from '../mobx/StateModels/functions/subscribeToRouterParams'

import BurgerMenu from './view/Components/BurgerMenu'

import StartpageView from './view/StartpageView'
import AboutView from './view/AboutView'
import SkillsView from './view/SkillsView'

const Views = {
  'startpage': StartpageView,
  'about': AboutView,
  'skills': SkillsView
}

@observer
class FallbackApp extends React.Component {
  constructor (props) {
    super(props)

    this.disposers = {}
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
  }

  @autobind
  onScroll (e) {
    const saveFallbackScrollTop = this.props.store.state[this.activePage] && this.props.store.state[this.activePage].basicInfo && this.props.store.state[this.activePage].basicInfo.saveFallbackScrollTop ? this.props.store.state[this.activePage].basicInfo.saveFallbackScrollTop : null
    if (saveFallbackScrollTop !== null) {
      const doc = document.documentElement
      const scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      saveFallbackScrollTop(scrollTop)
    }
  }

  @autobind
  attachStateToRouter (activePage) {
    if (!this.props.store.state[activePage]) {
      return
    }

    // Forward router params to the responsible state or null to indicate, that the state should no longer update based on the router params
    let routerParams = this.props.store.router.params
    if (activePage === this.props.store.router.model) {
      routerParams = this.props.store.router.params
    } else {
      routerParams = null
    }

    // If active page changed, scroll to top
    if (!this.activePage || this.activePage !== activePage) {
      const savedScrollTop = this.props.store.state[activePage] && this.props.store.state[activePage].basicInfo && this.props.store.state[activePage].basicInfo.saveFallbackScrollTop ? this.props.store.state[activePage].basicInfo.fallbackScrollTop : 0

      setTimeout(() => window.scroll({
        top: savedScrollTop,
        left: 0,
        behavior: 'smooth'
      }), 100)
    }
    this.activePage = activePage

    // Check if the responsible state does have a function to receive router params and forward them
    if (this.props.store.state[activePage].onRouterParamChange) {
      if (routerParams !== null) {
        // Only add disposers if there are none, which means no subscription inside of the state
        if (!this.disposers[activePage] || this.disposers[activePage].length <= 0) {
          this.disposers[activePage] = []

          // Save the disposer to delete the subscription from the state to the router parameters, when the current model changes
          this.disposers[activePage].push(subscribeToRouterParams(routerParams, this.props.store.state[activePage].onRouterParamChange))
        }
      } else {
        if (this.disposers[activePage]) {
          for (let disposer of this.disposers[activePage]) {
            // Dispose of all subscriptions of states that do not represent the current path
            disposer()
          }

          // Clear disposers
          this.disposers[activePage] = []
        }
      }
    }
  }

  @autobind
  render () {
    const activePage = this.props.store.global.activePage
    this.attachStateToRouter(activePage)

    const loadView = Views[activePage] ? React.createElement(Views[activePage], {
      global: this.props.store.global,
      state: this.props.store.state[activePage]
    }) : <span>404</span> // TODO Show real 404

    // TODO REMEMBER SCROLL POSITION
    return (
      <div className='fallback-site-wrapper'>
        <BurgerMenu activePage={activePage} show={this.props.store.global.showBurgerMenu} setShowFunc={this.props.store.global.setShowBurgerMenu} />
        {loadView}
      </div>
    )
  }
}

FallbackApp.propTypes = {
  store: PropTypes.object
}

export default FallbackApp
