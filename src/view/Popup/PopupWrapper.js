'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group'

import { observer } from 'mobx-react'
import { values } from 'mobx'

import autobind from 'autobind-decorator'

import PopupComponent from './PopupComponent'

import Style from '../../../style/variables/global.scss'

import StartPopup from './CustomPopups/StartPopup'
const CustomPopups = {
  'StartPopup': StartPopup
}

@observer
class PopupWrapper extends React.Component {
  @autobind
  componentDidMount () {
    window.addEventListener('keydown', this.onKeyDown)
  }

  @autobind
  componentWillUnmount () {
    window.removeEventListener('keydown', this.onKeyDown)
  }

  @autobind
  onKeyDown (e) {
    if (e && e.key && e.key === 'Escape') {
      if (values(this.props.popups)[0]) {
        this.props.closeFunc(values(this.props.popups)[0].id)
      }
    }
  }

  @autobind
  render () {
    return (
      <div className='popup-wrapper'>
        <TransitionGroup className='popup-list'>
          {values(this.props.popups).map(popup => (
            <CSSTransition key={popup.id + '-csstransition'} timeout={parseInt(Style.popupFadeOutDuration)} classNames='popup-transition'>
              {popup.customComponent !== '' && CustomPopups[popup.customComponent] ? React.createElement(CustomPopups[popup.customComponent], {
                closeFunc: () => this.props.closeFunc(popup.id),
                popup: popup
              }) : <PopupComponent key={popup.id} closeFunc={() => this.props.closeFunc(popup.id)} className={popup.className} title={popup.title} text={popup.text} hint={popup.hint} />}
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    )
  }
}

PopupWrapper.propTypes = {
  popups: PropTypes.object,
  closeFunc: PropTypes.func
}

export default PopupWrapper
