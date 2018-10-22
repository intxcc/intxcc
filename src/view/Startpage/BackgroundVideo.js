'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

import FallbackImageAlt from '../../config/FallbackImageAlt'

@observer
class BackgroundVideo extends React.Component {
  @autobind
  componentDidMount () {
    if (this.video) {
      this.video.play()
    }

    this.checkIfShouldStop()
  }

  @autobind
  getSnapshotBeforeUpdate () {
    this.checkIfShouldStop()

    return null
  }

  @autobind
  checkIfShouldStop () {
    if (this.video) {
      if (this.props.stopped) {
        this.video.pause()
      } else {
        this.video.play()
      }
    }
  }

  @autobind
  render () {
    const video = this.props.showVideo ? (
      <video ref={video => { this.video = video }} className='startpage-background-video' style={{display: this.props.stopped ? 'none' : 'initial'}} loop autoPlay>
        <source src='./intxcc.webm' type='video/webm' />
        <source src='./intxcc.mp4' type='video/mp4' />
      </video>
    ) : ''

    return (
      <div className='startpage-background'>
        <img className='startpage-background-image' alt={FallbackImageAlt} src='/fallback_intxcc.png' />
        {video}
      </div>
    )
  }
}

BackgroundVideo.propTypes = {
  stopped: PropTypes.bool,
  showVideo: PropTypes.bool
}

export default BackgroundVideo
