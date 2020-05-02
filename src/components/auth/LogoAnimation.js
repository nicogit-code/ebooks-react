import React, { Component } from 'react';
import styles from './LogoAnimation.css';

class LogoAnimation extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleMouseEnter = this.handleMouseEnter.bind(this, this.props.handleMouseEnter)
      this.handleMouseMove = this.handleMouseMove.bind(this, this.props.handleMouseMove)
      this.handleMouseLeave = this.handleMouseLeave.bind(this, this.props.handleMouseLeave)
  }
  handleMouseEnter(e) {
    console.log('onMouseEnter', e.clientX, e.clientY)
  }
  handleMouseMove(e){
    console.log(
      'onMouseMove',
      e.nativeEvent.clientX, e.nativeEvent.clientY
    )
  }
  handleMouseLeave(e) {
    console.log('onMouseLeave', e.clientX, e.clientY)
  }
    render() {
      return (
        <div style={styles}>
          <h1>Mouse over the photo:</h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}
            onMouseEnter={this.handleMouseEnter}
            onMouseMove={this.handleMouseMove}
            onMouseLeave={this.handleMouseLeave}
          >
            {/* <img src={dogBackground} alt="" /> */}
          </div>
        </div>
      )
    }
  }
  export default LogoAnimation;
