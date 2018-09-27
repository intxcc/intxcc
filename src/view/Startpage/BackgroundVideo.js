'use strict'

import React from 'react'

import autobind from 'autobind-decorator'

class BackgroundVideo extends React.Component {
  componentDidMount () {
    if (this.video) {
      this.video.playbackRate = 1
    }
  }

  @autobind
  render () {
    return (
      <div className='startpage-background'>
        <video ref={video => { this.video = video }} className='startpage-background-video' loop autoPlay>
          <source src="./intxcc.mp4" type="video/mp4" />
        </video>
      </div>
    )
  }
}

export default BackgroundVideo
