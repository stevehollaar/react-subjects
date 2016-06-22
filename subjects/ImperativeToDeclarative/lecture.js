import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import createOscillator from './utils/createOscillator'

const styles = {}

styles.theremin = {
  height: 200,
  width: 200,
  fontSize: 10,
  border: '1px solid',
  cursor: 'crosshair',
  margin: 10,
  display: 'inline-block'
}

const Theremin = React.createClass({
  getInitialState() {
    return {
      isPlaying: false,
      pitch: 0.2,
      volume: 0.15
    };
  },

  play() {
    this.setState({ isPlaying: true });
    // this.oscillator.play()
  },

  stop() {
    this.setState({ isPlaying: false });
    // this.oscillator.stop()
  },

  changeTone(event) {
    const { clientX, clientY } = event
    const { top, right, bottom, left } = event.target.getBoundingClientRect()
    const pitch = (clientX - left) / (right - left)
    const volume = 1 - (clientY - top) / (bottom - top)
    // this.oscillator.setPitchBend(pitch)
    // this.oscillator.setVolume(volume)
    this.setState({
      pitch, volume
    });
  },

  render() {
    return (
      <div
        style={styles.theremin}
        onMouseEnter={this.play}
        onMouseLeave={this.stop}
        onMouseMove={this.changeTone}
      >
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <Tone {...this.state} />
      </div>
    )
  }
})

const Tone = React.createClass({
  componentDidMount() {
    this.oscillator = createOscillator()
    this.doImperativeStuff();
  },

  componentDidUpdate() {
    this.doImperativeStuff();
  },

  doImperativeStuff() {
    const { isPlaying, pitch, volume } = this.props;
    if (isPlaying) {
      this.oscillator.play();
    } else {
      this.oscillator.stop();
    }

    this.oscillator.setPitchBend(pitch)
    this.oscillator.setVolume(volume)
  },

  render() {
    return null
  }
})

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>What does it mean to be declarative?</h1>
        <Theremin />
        <Theremin />
        <Theremin />
        <Theremin />
        <Theremin />
        <Theremin />
        <Theremin />
        <Theremin />
      </div>
    )
  }
})

render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Can't predict what the sound is going to be by looking at state or the render
// method, but componentDidUpdate makes things a lot easier to think about.

//const App = React.createClass({
//  getInitialState() {
//    return {
//      isPlaying: false,
//      pitch: 0,
//      volume: 0
//    }
//  },
//
//  componentDidMount() {
//    this.oscillator = createOscillator()
//  },
//
//  play() {
//    this.setState({ isPlaying: true })
//  },
//
//  stop() {
//    this.setState({ isPlaying: false })
//  },
//
//  changeTone(event) {
//    const { clientX, clientY } = event
//    const { top, right, bottom, left } = event.target.getBoundingClientRect()
//    const pitch = (clientX - left) / (right - left)
//    const volume = 1 - (clientY - top) / (bottom - top)
//    this.setState({ pitch, volume })
//  },
//
//  componentDidUpdate() {
//    if (this.state.isPlaying) {
//      this.oscillator.play()
//    } else {
//      this.oscillator.stop()
//    }
//
//    this.oscillator.setPitchBend(this.state.pitch)
//    this.oscillator.setVolume(this.state.volume)
//  },
//
//  render() {
//    return (
//      <div>
//        <h1>What does it mean to be declarative?</h1>
//        <div
//          style={styles.theremin}
//          onMouseEnter={this.play}
//          onMouseLeave={this.stop}
//          onMouseMove={this.changeTone}
//        />
//      </div>
//    )
//  }
//
//})
//
//render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// We can do even better and make this fully declarative for the <App>. Instead
// of using this.oscillator (an imperative API), let's wrap that up into a
// <Tone> component and control it declaratively.

//const Tone = React.createClass({
//  propTypes: {
//    isPlaying: PropTypes.bool.isRequired,
//    pitch: PropTypes.number.isRequired,
//    volume: PropTypes.number.isRequired
//  },
//
//  componentDidMount() {
//    this.oscillator = createOscillator()
//    this.doImperativeWork()
//  },
//
//  componentDidUpdate() {
//    this.doImperativeWork()
//  },
//
//  doImperativeWork() {
//    if (this.props.isPlaying) {
//      this.oscillator.play()
//    } else {
//      this.oscillator.stop()
//    }
//
//    this.oscillator.setPitchBend(this.props.pitch)
//    this.oscillator.setVolume(this.props.volume)
//  },
//
//  render() {
//    return null
//  }
//
//})
//
//const App = React.createClass({
//
//  getInitialState() {
//    return {
//      isPlaying: false,
//      pitch: 0.5,
//      volume: 0.5
//    }
//  },
//
//  play() {
//    this.setState({ isPlaying: true })
//  },
//
//  stop() {
//    this.setState({ isPlaying: false })
//  },
//
//  changeTone(event) {
//    const { clientX, clientY } = event
//    const { top, right, bottom, left } = event.target.getBoundingClientRect()
//    const pitch = (clientX - left) / (right - left)
//    const volume = 1 - (clientY - top) / (bottom - top)
//    this.setState({ pitch, volume })
//  },
//
//  render() {
//    return (
//      <div>
//        <h1>What does it mean to be declarative?</h1>
//        <div
//          style={styles.theremin}
//          onMouseEnter={this.play}
//          onMouseLeave={this.stop}
//          onMouseMove={this.changeTone}
//        >
//          <Tone {...this.state}/>
//        </div>
//      </div>
//    )
//  }
//
//})
//
//render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// Pull out <Theremin> into its own component - you're most of the way there!

////////////////////////////////////////////////////////////////////////////////
// Add a <Tone waveType> prop that changes the type of sound wave that is
// generated and render many of them.

//const waveType = PropTypes.oneOf([
// 'sine',
// 'triangle',
// 'square',
// 'sawtooth'
//])
//
//const Tone = React.createClass({
//  propTypes: {
//    isPlaying: PropTypes.bool.isRequired,
//    pitch: PropTypes.number.isRequired,
//    volume: PropTypes.number.isRequired,
//    waveType: waveType.isRequired
//  },
//
//  getDefaultProps() {
//    return {
//      waveType: 'sine'
//    }
//  },
//
//  componentDidMount() {
//    this.oscillator = createOscillator()
//    this.doImperativeWork()
//  },
//
//  componentDidUpdate() {
//    this.doImperativeWork()
//  },
//
//  doImperativeWork() {
//    if (this.props.isPlaying) {
//      this.oscillator.play()
//    } else {
//      this.oscillator.stop()
//    }
//
//    this.oscillator.setPitchBend(this.props.pitch)
//    this.oscillator.setVolume(this.props.volume)
//    this.oscillator.setType(this.props.waveType)
//  },
//
//  render() {
//    return null
//  }
//
//})
//
//const Theremin = React.createClass({
//
//  propTypes: {
//    type: waveType
//  },
//
//  getInitialState() {
//    return {
//      isPlaying: false,
//      pitch: 0,
//      volume: 0
//    }
//  },
//
//  play() {
//    this.setState({ isPlaying: true })
//  },
//
//  stop() {
//    this.setState({ isPlaying: false })
//  },
//
//  changeTone(event) {
//    const { clientX, clientY } = event
//    const { top, right, bottom, left } = event.target.getBoundingClientRect()
//    const pitch = (clientX - left) / (right - left)
//    const volume = 1 - (clientY - top) / (bottom - top)
//    this.setState({ pitch, volume })
//  },
//
//  render() {
//    return (
//      <div
//        style={styles.theremin}
//        onMouseEnter={this.play}
//        onMouseLeave={this.stop}
//        onMouseMove={this.changeTone}
//      >
//        <Tone {...this.state} waveType={this.props.type}/>
//      </div>
//    )
//  }
//
//})
//
//const App = React.createClass({
//
//  render() {
//    return (
//      <div>
//        <h1>What does it mean to be declarative?</h1>
//        <Theremin/>
//        <Theremin type="triangle"/>
//        <Theremin type="square"/>
//        <Theremin type="sawtooth"/>
//      </div>
//    )
//  }
//
//})
//
//render(<App/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// When you isolate all imperative work into components then the application
// using them can model their UI in a declarative, predictible way because
// it renders based on a snapshot of state, time has been removed from the
// equation.
//
// Additionally, when the components doing the imperative work do it all in
// componentDidMount and componenDidUpdate, you even make the imperative
// work predictable because it's based on a snapshot of state in time also.
