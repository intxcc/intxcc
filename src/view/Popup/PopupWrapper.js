'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'

import { observer } from 'mobx-react'
import { values } from 'mobx'

import { isEmpty } from '../../miscFunctions'

import PopupComponent from './PopupComponent'

import Style from '../../../style/variables/global.scss'

import StartPopup from './CustomPopups/StartPopup'
const CustomPopups = {
  'StartPopup': StartPopup
}

/** This component makes sure to transition popup enter and leaves and makes sure escape closed the popup. Is used in the fallback and normal version of the website. */
@observer
class PopupWrapper extends React.Component {
  constructor (props) {
    super(props)

    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.render = this.render.bind(this)
  }

  componentDidMount () {
    window.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  onKeyDown (e) {
    if (e && e.key && e.key === 'Escape') {
      if (values(this.props.popups)[0]) {
        this.props.closeFunc(values(this.props.popups)[0].id)
      }
    }
  }

  render () {
    return (
      <div className={'popup-wrapper' + (isEmpty(this.props.popups.toJSON()) ? '' : ' not-empty')}>
        <TransitionGroup className='popup-list'>
          {values(this.props.popups).map(popup => {
            const hint = this.props.isFallback && popup.fallbackHint && popup.fallbackHint !== '' ? popup.fallbackHint : popup.hint
            return (
              <CSSTransition key={popup.id + '-csstransition'} timeout={parseInt(Style.popupFadeOutDuration)} classNames='popup-transition'>
                {popup.customComponent !== '' && CustomPopups[popup.customComponent] ? React.createElement(CustomPopups[popup.customComponent], {
                  closeFunc: () => this.props.closeFunc(popup.id),
                  popup: popup
                }) : <PopupComponent key={popup.id} closeFunc={() => this.props.closeFunc(popup.id)} className={popup.className} title={popup.title} text={popup.text} hint={hint} trivia={popup.trivia} />}
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </div>
    )
  }
}

PopupWrapper.propTypes = {
  isFallback: PropTypes.bool,
  popups: PropTypes.object,
  closeFunc: PropTypes.func
}

export default PopupWrapper
