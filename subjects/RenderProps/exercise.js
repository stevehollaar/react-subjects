////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <Tail> that only logs the last `n` number of rows in a dataset,
// with an API that allows the developer to control the rendering.
//
// Hint: You can use a prop that renders a single item, or you can pass all
// the items to the render prop handing over all rendering control to the
// developer
//
// Got extra time?
//
// - Make the <Tail> scroll to the bottom when new rows come in
// - If you didn't already do it this way, make it declarative with a
//   <PinnedToBottom> component
// - Now make sure if the user scrolls up, you don't scroll them down
// - Make a <JSONP> component that fetches data with the jsonp package used in
//   `utils/githubSearch` that uses a render prop to pass its data back up
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render, findDOMNode } from 'react-dom'
import { listen } from './utils/log'

const PinnedToBottom = React.createClass({
  propTypes: {
    bufferPx: React.PropTypes.number.isRequired,
    children: React.PropTypes.node
  },

  componentDidMount() {
    this.pinToBottom()
  },

  componentDidUpdate() {
    this.pinToBottom()
  },

  pinToBottom() {
    const el = findDOMNode(this)
    const { scrollHeight, scrollTop, clientHeight } = el;
    // if ((scrollHeight - scrollTop) < this.props.bufferPx) {
    if ((scrollHeight - (scrollHeight + scrollTop)) < this.props.bufferPx) {

      el.scrollTop = scrollHeight
    }
    // }
  },

  render() {
    const { style = {} } = this.props;
    return <div {...this.props} style={{...style, overflowY: 'scroll'}} />
  }
})

const Tail = React.createClass({
  propTypes: {
    lines: React.PropTypes.array.isRequired,
    numLines: React.PropTypes.number.isRequired,
    children: React.PropTypes.func.isRequired
  },

  render() {
    const { lines, numLines, children } = this.props;
    const lastLines = lines.slice(lines.length - numLines);
    return this.props.children(lastLines);
  }
})

const App = React.createClass({
  getInitialState() {
    return {
      lines: []
    }
  },

  componentDidMount() {
    listen(newLines => {
      this.setState({
        lines: this.state.lines.concat(newLines)
      })
    })
  },

  render() {
    return (
      <div>
        <h1>Heads up Eggman, here comes <code>&lt;Tails&gt;</code>s!</h1>
        <PinnedToBottom style={{ height: 200, border: '1px solid' }} bufferPx={10}>
          <Tail numLines={5} lines={this.state.lines} children={() => null}>
            {lines =>
              <ul>
                {lines.map((line, index) =>
                  <li key={line}>
                    {line}
                  </li>
                )}
              </ul>
            }
          </Tail>
        </PinnedToBottom>
      </div>
    )
  }
})

render(<App/>, document.getElementById('app'))
