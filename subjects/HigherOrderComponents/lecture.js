import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import createMediaListener from './lib/createMediaListener'

const media = createMediaListener({
  big: '(min-width : 1000px)',
  tiny: '(max-width: 400px)'
})

const Media = React.createClass({
  propTypes: {
    children: React.PropTypes.func
  },

  getInitialState() {
    return {
      media: this.props.media.getState()
    }
  },

  componentDidMount() {
    this.props.media.listen((media) => {
      this.setState({ media })
    })
  },

  componentWillUnmount() {
    this.props.media.dispose()
  },

  render() {
    return this.props.children(this.state.media)
  }
})

const withMedia = (Component, media) => {
  return React.createClass({
    getInitialState() {
      return {
        media: media.getState()
      }
    },

    componentDidMount() {
      media.listen((media) => {
        this.setState({ media })
      })
    },

    componentWillUnmount() {
      media.dispose()
    },

    render() {
      return <Component {...this.props} media={this.state.media} />
    }
  })
}

const App = React.createClass({
  render() {
    const { media } = this.props

    return media.big ? (
      <h1>Hey, this is a big screen</h1>
    ) : media.tiny ? (
      <h6>tiny tiny tiny</h6>
    ) : (
      <h3>Meh...</h3>
    )
  }
})

const AppWithMedia2 = React.createClass({
  render() {
    return (
      <Media media={media}>
        {media =>
          media.big ? (
          <h1>Hey, this is a big screen</h1>
        ) : media.tiny ? (
          <h6>tiny tiny tiny</h6>
        ) : (
          <h3>Meh...</h3>
        )
        }
      </Media>
    )
  }
})

const AppWithMedia = withMedia(App, media)

render(<AppWithMedia2/>, document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// We can move all of that code into a higher-order component. A higher-order
// component (HoC) is a function that takes a `Component` as an argument,
// and returns a new component renders the `Component` with some extra props.

//const mediaComponent = (Component, mediaQueries) => {
//  const media = createMediaListener(mediaQueries)
//
//  return React.createClass({
//    getInitialState() {
//      return {
//        media: media.getState()
//      }
//    },
//
//    componentDidMount() {
//      media.listen((media) => {
//        this.setState({ media })
//      })
//    },
//
//    componentWillUnmount() {
//      media.dispose()
//    },
//
//    render() {
//      return <Component {...this.props} media={this.state.media}/>
//    }
//  })
//}
//
//const App = React.createClass({
//  propTypes: {
//    media: PropTypes.shape({
//      big: PropTypes.bool,
//      tiny: PropTypes.bool
//    })
//  },
//
//  render() {
//    const { media } = this.props
//    return media.big ? (
//      <h1>Hey, this is a big screen</h1>
//    ) : media.tiny ? (
//      <h6>tiny tiny tiny</h6>
//    ) : (
//      <h3>Meh ...</h3>
//    )
//  }
//})
//
//const AppWithMedia = mediaComponent(App, {
//  big: '(min-width : 1000px)',
//  tiny: '(max-width: 400px)'
//})
//
//render(<AppWithMedia/>, document.getElementById('app'))
