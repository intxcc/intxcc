'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

@observer
class PopupComponent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      hidden: true
    }
  }

  @autobind
  componentDidMount () {
    this.show()
  }

  @autobind
  show () {
    this.setState({
      hidden: false
    })
  }

  @autobind
  hide () {
    this.setState({
      hidden: true
    })
  }

  @autobind
  close () {
    this.hide()
    this.props.basicInfo.setDisabled(false)
  }

  @autobind
  render () {
    return (
      <div className={'popup' + (this.state.hidden ? ' hidden' : '')}>
        <h1>{this.props.title}</h1>
        <div className='close-btn-wrapper'>
          <div onClick={this.close} className='close-btn'>
            <FontAwesomeIcon icon={'times'} />
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
}

PopupComponent.propTypes = {
  basicInfo: PropTypes.object,
  children: PropTypes.object,
  title: PropTypes.string
}

export default PopupComponent
