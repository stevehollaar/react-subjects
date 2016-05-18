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
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import * as RainbowListDelegate from './RainbowListDelegate'
import './styles'

const ListView = React.createClass({
  propTypes: {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  },

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props
    const totalHeight = numRows * rowHeight

    const items = []

    let index = 0
    while (index < numRows) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }

    return (
      <div style={{ height: '100%', overflowY: 'scroll' }}>
        <ol style={{ height: totalHeight }}>
          {items}
        </ol>
      </div>
    )
  }
})

render(
  <ListView
    numRows={500}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById('app')
)
