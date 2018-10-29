'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import subscribeToRouterParams from '../mobx/StateModels/functions/subscribeToRouterParams'

import BurgerMenu from './view/Components/BurgerMenu'
import GoToTopButton from './view/Components/GoToTopButton'

import FallbackPopupWrapper from './view/Components/FallbackPopupWrapper'

import StartpageView from './view/StartpageView'
import AboutView from './view/AboutView'
import StoriesView from './view/StoriesView'
import SkillsView from './view/SkillsView'
import ContactView from './view/ContactView'

const Pages = [
  'startpage',
  'about',
  'stories',
  'skills',
  'contact'
]

const Views = {
  'startpage': StartpageView,
  'about': AboutView,
  'stories': StoriesView,
  'skills': SkillsView,
  'contact': ContactView
}

@observer
class FallbackApp extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      scrollTop: 0
    }

    this.disposers = {}

    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onScroll = this.onScroll.bind(this)
    this.handleAttachStateToRouter = this.handleAttachStateToRouter.bind(this)
    this.render = this.render.bind(this)
  }

  componentDidMount () {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('keydown', this.onKeyDown)

    if (this.setScrollTopToZeroOnPageChangeTimeout) {
      clearTimeout(this.setScrollTopToZeroOnPageChangeTimeout)
    }

    // Dispone of all subscriptions on unmount
    for (let stateName in this.disposers) {
      const disposers = this.disposers[stateName]
      for (let disposer of disposers) {
        disposer()
      }
    }
  }

  onKeyDown (e) {
    const handleOnKeyDown = this.props.store.state[this.lastActivePage] && this.props.store.state[this.lastActivePage].handleOnKeyDown ? this.props.store.state[this.lastActivePage].handleOnKeyDown : null
    if (handleOnKeyDown !== null) {
      handleOnKeyDown(e)
    }
  }

  onScroll (e) {
    const doc = document.documentElement
    const scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)

    setTimeout(() => this.props.store.global.fallbackOnScroll(scrollTop), 0)

    // Scroll is ignored, while the scrollbar of the main wrapper is disabled, and he controls are shown
    if (this.scrollbarDisabled) {
      if (!this.props.store.global.fallbackShowControls) {
        setTimeout(() => this.props.store.global.setFallbackShowControls(true), 0)
      }
      return
    }

    // Save scrollTop in react state to decide if the back-to-top button is shown
    setTimeout(() => {
      this.setState({
        scrollTop: scrollTop
      })
    }, 0)

    const saveFallbackScrollTop = this.props.store.state[this.lastActivePage] && this.props.store.state[this.lastActivePage].basicInfo && this.props.store.state[this.lastActivePage].basicInfo.saveFallbackScrollTop ? this.props.store.state[this.lastActivePage].basicInfo.saveFallbackScrollTop : null
    if (saveFallbackScrollTop !== null) {
      saveFallbackScrollTop(scrollTop)
    }

    // If the activePage has a onScroll function, pass the scrollTop to it
    const stateOnScroll = this.props.store.state[this.lastActivePage] && this.props.store.state[this.lastActivePage].onScroll ? this.props.store.state[this.lastActivePage].onScroll : null
    if (stateOnScroll !== null) {
      stateOnScroll(scrollTop)
    }
  }

  handleAttachStateToRouter () {
    for (let stateName of Pages) {
      if (!this.props.store.state[stateName]) {
        return
      }

      // Forward router params to the responsible state or null to indicate, that the state should no longer update based on the router params
      let routerParams = this.props.store.router.params
      if (stateName === this.props.store.router.model) {
        routerParams = this.props.store.router.params
      } else {
        routerParams = null
      }

      // Check if the current state in the  does have a function to receive router params and forward them
      if (this.props.store.state[stateName].onRouterParamChange) {
        // Router params = null means, that the current state is not supposed to subscribe to the router, so dispose them in the else clause
        if (routerParams !== null) {
          // Only add disposers if there are none, which means no subscription inside of the state
          if (!this.disposers[stateName] || this.disposers[stateName].length <= 0) {
            this.disposers[stateName] = []

            // Save the disposer to delete the subscription from the state to the router parameters, when the current model changes
            this.disposers[stateName].push(subscribeToRouterParams(routerParams, this.props.store.state[stateName].onRouterParamChange))
          }
        } else {
          if (this.disposers[stateName]) {
            for (let disposer of this.disposers[stateName]) {
              // Dispose of all subscriptions of states that do not represent the current path
              disposer()
            }

            // Clear disposers
            this.disposers[stateName] = []
          }
        }
      }
    }
  }

  render () {
    const activePage = this.props.store.global.activePage

    // Load popup component for the active page
    let isDisabled = false
    if (this.props.store.state[activePage]) {
      // If the router set fallbackShow404Popup to true, the active page will get a 404Popup and reset the router property fallbackShow404Popup
      if (this.props.store.router.fallbackShow404Popup) {
        setTimeout(() => {
          this.props.store.state[activePage].basicInfo.show404Popup()
          this.props.store.router.resetFallbackShow404Popup()
        }, 0)
      }

      isDisabled = this.props.store.state[activePage].basicInfo.isDisabled
    }

    const loadView = Views[activePage] ? React.createElement(Views[activePage], {
      global: this.props.store.global,
      state: this.props.store.state[activePage]
    }) : ''

    let scrollbarDisabled = false

    const skillDetailsActive = activePage === 'skills' && this.props.store.state[activePage].fallbackShowSkillDetails
    const skillFilterActive = activePage === 'skills' && this.props.store.state[activePage].fallbackShowFilter

    // MARKER_SCROLLBAR All events that should result in a disabled scroll bar go here
    if (skillDetailsActive || isDisabled) {
      scrollbarDisabled = true
    }

    // Animate scroll
    if (!scrollbarDisabled && this.props.store.state[activePage] && this.props.store.state[activePage].basicInfo) {
      if (this.props.store.state[activePage].basicInfo.animateScrollBy) {
        setTimeout(() => window.scrollBy({
          top: this.props.store.state[activePage].basicInfo.scrollByValue,
          left: 0,
          behavior: 'smooth'
        }), 100)

        if (this.props.store.state[activePage].ignoreScrollForMs) {
          this.props.store.state[activePage].ignoreScrollForMs(2000)
        }

        // Disable scroll by, so it will not get triggered on next render
        setTimeout(this.props.store.state[activePage].basicInfo.stopScrollBy, 0)
      }
    }

    // Only revert or save scroll top, if the active page did not change between renders
    if (activePage === this.lastActivePage) {
      // If the scrollbar will be disabled in the next render, save the current scrollTop and go back to it if the scrollbar is enabled again
      if (typeof this.scrollbarDisabled !== 'undefined' && this.scrollbarDisabled !== scrollbarDisabled) {
        if (scrollbarDisabled) {
          const doc = document.documentElement
          const scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)

          // Save scrollTop in responsible state to revert to it, after the scrollbar was enabled again
          const saveFallbackScrollTop = this.props.store.state[activePage] && this.props.store.state[activePage].basicInfo && this.props.store.state[activePage].basicInfo.saveFallbackScrollTop ? this.props.store.state[activePage].basicInfo.saveFallbackScrollTop : null

          if (saveFallbackScrollTop !== null) {
            saveFallbackScrollTop(scrollTop)
          }
        } else {
          const savedScrollTop = this.props.store.state[activePage] && this.props.store.state[activePage].basicInfo && this.props.store.state[activePage].basicInfo.saveFallbackScrollTop ? this.props.store.state[activePage].basicInfo.fallbackScrollTop : 0

          setTimeout(() => window.scroll({
            top: savedScrollTop,
            left: 0
          }), 0)
        }
      }
    }

    // Things to do, if the active page changed
    if (activePage !== this.lastActivePage) {
      // If active page changed, clear non-persistent popups
      if (this.props.store.state[this.lastActivePage]) {
        setTimeout(this.props.store.state[this.lastActivePage].basicInfo.clearNotPersistentPopups, 0)
      }

      // Handle the router subscription
      this.handleAttachStateToRouter(activePage)

      // Every time one goes to the fallback skills, select all skills. This is important if one deselected all skills and then clicks on a link on the about page. Then one should not read '0 of 0 Skills' for UX reasons.
      if (activePage === 'skills' && this.props.store.state[activePage]) {
        this.props.store.state[activePage].fallbackSelection.showAll(this.props.store.state[activePage].columns)
      }

      // Scroll to top or last saved position
      const savedScrollTop = this.props.store.state[activePage] && this.props.store.state[activePage].basicInfo && this.props.store.state[activePage].basicInfo.saveFallbackScrollTop ? this.props.store.state[activePage].basicInfo.fallbackScrollTop : 0
      setTimeout(() => window.scroll({
        top: savedScrollTop,
        left: 0
      }), 0)

      // This fixes a bug, where the scroll-to-top-button would be shown, even though there was no scroll
      if (savedScrollTop === 0) {
        this.setScrollTopToZeroOnPageChangeTimeout = setTimeout(() => {
          this.setScrollTopToZeroOnPageChangeTimeout = false
          this.setState({
            scrollTop: 0
          })
        }, 0)
      }
    }

    // Save the scrollbar disabled state and lastActivePage, to notice changes
    this.scrollbarDisabled = scrollbarDisabled
    this.lastActivePage = activePage

    return (
      <div className={'fallback-site-wrapper' + (scrollbarDisabled ? ' disable-scroll-bar' : '') + (isDisabled ? ' disable-fallback-view-wrapper' : '')}>
        <BurgerMenu showHandle={true} activePage={activePage} show={this.props.store.global.showBurgerMenu} setShowFunc={this.props.store.global.setShowBurgerMenu} />
        <GoToTopButton classNameSuffix={skillFilterActive ? ' filter-active' : ''} show={this.props.store.global.fallbackShowControls && this.state.scrollTop > 100} />
        <FallbackPopupWrapper states={this.props.store.state} activePage={this.props.store.global.activePage} />
        <div className='fallback-disabled-background'></div>
        {loadView}
      </div>
    )
  }
}

FallbackApp.propTypes = {
  store: PropTypes.object
}

export default FallbackApp
