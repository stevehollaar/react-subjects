////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to
//   prevent tearing when scrolling quickly
// - Remember scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import * as RainbowListDelegate from './RainbowListDelegate'
import _ from 'underscore'
import './styles'

const BUFFER = 50

const ListView = React.createClass({
  propTypes: {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      scrollTop: 0,
      clientHeight: 0
    }
  },

  componentDidMount() {
    this.node = findDOMNode(this)
    this.updateSizes()
    window.addEventListener('resize', this.onResize)
  },

  updateSizes() {
    const { scrollTop, clientHeight } = this.node
    this.setState({ scrollTop, clientHeight })
  },

  onScroll() {
    this.updateSizes()
  },

  onResize() {
    this.updateSizes()
  },

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props
    const { scrollTop, clientHeight } = this.state
    const totalHeight = numRows * rowHeight

    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - BUFFER)
    const endIndex = Math.min(startIndex + Math.ceil(clientHeight / rowHeight) + BUFFER, numRows - 1)


    const items = []
    console.log(`rendering ${startIndex} to ${endIndex}`)

    let index = startIndex
    while (index <= endIndex) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }

    // items.push(
    //   <div key='end' style={{height: (numRows - endIndex) * rowHeight}} />
    // )

    return (
      <div
        style={{ height: '100%', overflowY: 'scroll' }}
        onScroll={this.onScroll}
      >
        <ol style={{ height: totalHeight, paddingTop: startIndex * rowHeight }}>
          {items}
        </ol>
      </div>
    )
  }
})

render(
  <ListView
    numRows={1118481}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById('app')
)
