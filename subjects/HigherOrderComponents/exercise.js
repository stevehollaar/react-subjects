////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMousePosition`a a "higher-order component" that sends the mouse
// position to the component as props.
//
// hint: use `event.clientX` and `event.clientY`

import React from 'react'
import { render } from 'react-dom'

const withMousePosition = (Component) => {
  return React.createClass({
    componentDidMount() {
      window.addEventListener('mousemove', this.handleMouseMove)
    },

    componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove)
    },

    handleMouseMove(evt) {
      const { clientX, clientY } = evt
      this.setState({
        x: clientX,
        y: clientY
      })
    },

    getInitialState() {
      return {
        x: 0,
        y: 0
      }
    },

    render() {
      return (
        <Component
          {...this.props}
          mouse={this.state}
        />
      )
    }
  })
}

const App = React.createClass({

  propTypes: {
    mouse: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired
    }).isRequired
  },

  render() {
    return (
      <div>
        <h1>With the mouse!</h1>
        <pre>{JSON.stringify(this.props.mouse, null, 2)}</pre>
      </div>
    )
  }

})

const AppWithMouse = withMousePosition(App)

render(<AppWithMouse/>, document.getElementById('app'))

