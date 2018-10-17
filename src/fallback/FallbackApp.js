'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

import subscribeToRouterParams from '../mobx/StateModels/functions/subscribeToRouterParams'

import BurgerMenu from './view/Components/BurgerMenu'
import GoToTopButton from './view/Components/GoToTopButton'

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

    this.state = {
      scrollTop: 0
    }

    this.disposers = {}
  }

  @autobind
  componentDidMount () {
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('wheel', this.onWheel)
  }

  @autobind
  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('wheel', this.onWheel)
  }

  @autobind
  onWheel (e) {
    // Ignore onwheel if the usere is trying to zoom
    if (e && e.ctrlKey) {
      return
    }

    // TODO Check if this is a good idea, because if one skill detail is too long and a acrollbar is shown one will not be able to use it with the scroll wheel. But this might only happen on mobile devices, so check it.
    if (this.skillDetailsActive) {
      const key = e.deltaY < 0 ? 'ArrowLeft' : 'ArrowRight'
      this.onKeyDown({
        key: key
      })
    }
  }

  @autobind
  onKeyDown (e) {
    const handleOnKeyDown = this.props.store.state[this.activePage] && this.props.store.state[this.activePage].handleOnKeyDown ? this.props.store.state[this.activePage].handleOnKeyDown : null
    if (handleOnKeyDown !== null) {
      handleOnKeyDown(e)
    }
  }

  @autobind
  onScroll (e) {
    // Scroll is ignored, while the scrollbar of the main wrapper is disabled
    if (this.scrollbarDisabled) {
      return
    }

    const doc = document.documentElement
    const scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)

    // Save scrollTop in react state to decide if the back-to-top button is shown
    this.setState({
      scrollTop: scrollTop
    })

    const saveFallbackScrollTop = this.props.store.state[this.activePage] && this.props.store.state[this.activePage].basicInfo && this.props.store.state[this.activePage].basicInfo.saveFallbackScrollTop ? this.props.store.state[this.activePage].basicInfo.saveFallbackScrollTop : null
    if (saveFallbackScrollTop !== null) {
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

    // If active page changed, scroll to saved position
    if (!this.activePage || this.activePage !== activePage) {
      const savedScrollTop = this.props.store.state[activePage] && this.props.store.state[activePage].basicInfo && this.props.store.state[activePage].basicInfo.saveFallbackScrollTop ? this.props.store.state[activePage].basicInfo.fallbackScrollTop : 0

      setTimeout(() => window.scroll({
        top: savedScrollTop,
        left: 0
      }), 0)
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

    // MARKER_SCROLLBAR All events that should result in a disabled scroll bar go here
    let scrollbarDisabled = false

    // Save skillDetailsActive to this, so we can scroll through skills onwheel if it is active
    this.skillDetailsActive = activePage === 'skills' && this.props.store.state[activePage].fallbackShowSkillDetails

    if (this.skillDetailsActive) {
      scrollbarDisabled = true
    }

    // Only revert or save scroll top, if the active page did not change between renders
    if (activePage === this.lastActivePage) {
      // If the scrollbar will be disabled in the next render, save the current scrollTop and go back to it if the scrollbar is enabled again
      if (typeof this.scrollbarDisabled !== 'undefined' && this.scrollbarDisabled !== scrollbarDisabled) {
        if (scrollbarDisabled) {
          const doc = document.documentElement
          const scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)

          // Save scrollTop in responsible state to revert to it, after the scrollbar was enabled again
          const saveFallbackScrollTop = this.props.store.state[this.activePage] && this.props.store.state[this.activePage].basicInfo && this.props.store.state[this.activePage].basicInfo.saveFallbackScrollTop ? this.props.store.state[this.activePage].basicInfo.saveFallbackScrollTop : null

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

    // Save the scrollbar disabled state, to notice changes
    this.scrollbarDisabled = scrollbarDisabled
    this.lastActivePage = activePage

    return (
      <div className={'fallback-site-wrapper' + (scrollbarDisabled ? ' disable-scroll-bar' : '')}>
        <BurgerMenu activePage={activePage} show={this.props.store.global.showBurgerMenu} setShowFunc={this.props.store.global.setShowBurgerMenu} />
        <GoToTopButton show={this.state.scrollTop > 100} />
        {loadView}
      </div>
    )
  }
}

FallbackApp.propTypes = {
  store: PropTypes.object
}

export default FallbackApp
