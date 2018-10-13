'use strict'

import React from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'

import autobind from 'autobind-decorator'

@observer
class BackgroundVideo extends React.Component {
  @autobind
  componentDidMount () {
    if (this.video) {
      this.video.playbackRate = 1
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
      this.video.playbackRate = this.props.stopped ? 0 : 1
    }
  }

  @autobind
  render () {
    const video = this.props.showVideo ? (
      <video ref={video => { this.video = video }} className='startpage-background-video' loop autoPlay>
        <source src="./intxcc.webm" type="video/webm" />
        <source src="./intxcc.mp4" type="video/mp4" />
      </video>
    ) : ''

    return (
      <div className='startpage-background'>
        <img className='startpage-background-image' alt='Snapshot of first frame of the background video. The background video shows fast moving wireframe objects, that resemble the text "intxcc". They change very quickly between a very abstract representation and a clear one while showing it from different angles. The right side of the video is blurred out.' src='/fallback_intxcc.png' />
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
