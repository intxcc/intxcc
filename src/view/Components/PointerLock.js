'use strict'

import React from 'react'
import PropTypes from 'prop-types'

class PointerLock extends React.Component {
  constructor (props) {
    super(props)

    this.pointerLocked = false

    this.componentDidMount = this.componentDidMount.bind(this)
    this.componentWillUnmount = this.componentWillUnmount.bind(this)
    this.lockChangeAlert = this.lockChangeAlert.bind(this)
    this.requestPointerLock = this.requestPointerLock.bind(this)
    this.exitPointerLock = this.exitPointerLock.bind(this)
    this.togglePointerLock = this.togglePointerLock.bind(this)
    this.onClick = this.onClick.bind(this)
    this.safariMouseMoveWorkaround = this.safariMouseMoveWorkaround.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.render = this.render.bind(this)
  }

  componentDidMount () {
    if ('onpointerlockchange' in document) {
      document.addEventListener('pointerlockchange', this.lockChangeAlert, false)
    } else if ('onmozpointerlockchange' in document) {
      document.addEventListener('mozpointerlockchange', this.lockChangeAlert, false)
    }
  }

  componentWillUnmount () {
    if ('onpointerlockchange' in document) {
      document.removeEventListener('pointerlockchange', this.lockChangeAlert)
    } else if ('onmozpointerlockchange' in document) {
      document.removeEventListener('mozpointerlockchange', this.lockChangeAlert)
    }
  }

  lockChangeAlert () {
    if (document.pointerLockElement === this.canvas || document.mozPointerLockElement === this.canvas) {
      this.pointerLocked = true
    } else {
      this.pointerLocked = false
    }

    // Callback function given to this component to alert on change
    this.props.onPointerLockChange(this.pointerLocked)
  }

  requestPointerLock () {
    this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock
    this.canvas.requestPointerLock()
  }

  exitPointerLock () {
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock
    document.exitPointerLock()
  }

  togglePointerLock () {
    if (this.pointerLocked) {
      this.exitPointerLock()
    } else {
      this.requestPointerLock()
    }

    this.pointerLocked = !this.pointerLocked
  }

  onClick () {
    this.prevX = false
    this.prevY = false

    this.togglePointerLock()
  }

  safariMouseMoveWorkaround (e) {
    // Callback whenever the mouse moves
    var movementX = (this.prevX ? e.screenX - this.prevX : 0)
    var movementY = (this.prevY ? e.screenY - this.prevY : 0)

    this.props.onMovement({
      x: movementX,
      y: movementY
    })

    this.prevX = e.screenX
    this.prevY = e.screenY
  }

  onMouseMove (e) {
    if (!this.pointerLocked) {
      return
    }

    if (this.props.onMovement) {
      if (e.nativeEvent.movementX && e.nativeEvent.movementY) {
        this.props.onMovement({
          x: e.nativeEvent.movementX,
          y: e.nativeEvent.movementY
        })
      } else {
        this.safariMouseMoveWorkaround(e)
      }
    }
  }

  render () {
    return (
      <canvas onMouseMove={this.onMouseMove} onClick={this.onClick} ref={canvas => { this.canvas = canvas }} className={this.props.className} />
    )
  }
}

PointerLock.propTypes = {
  className: PropTypes.string,
  // Is called when the mouse is locked and is moving. Gives element with delta {x: <x>, y: <y>}
  onMovement: PropTypes.func,
  onPointerLockChange: PropTypes.func
}

export default PointerLock
