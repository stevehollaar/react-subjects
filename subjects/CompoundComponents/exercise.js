////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Implement a radio group form control with the API found in <App>.
//
// - Clicking a <RadioOption> should update the value of <RadioGroup>
// - The selected <RadioOption> should pass the correct value to its <RadioIcon>
// - The `defaultValue` should be set on first render
//
// Hints to get started:
//
// - <RadioGroup> will need some state
// - It then needs to pass that state to the <RadioOption>s so they know
//   whether or not they are active
//
// Got extra time?
//
// Implement a `value` prop and allow this to work like a "controlled input"
// (https://facebook.github.io/react/docs/forms.html#controlled-components)
//
// - Add a button to <App> that sets `this.state.radioValue` to a pre-determined
//   value, like "tape"
// - Make the <RadioGroup> update accordingly
//
// Implement keyboard controls on the <RadioGroup> (you'll need tabIndex="0" on
// the <RadioOption>s so the keyboard will work)
//
// - Enter and space bar should select the option
// - Arrow right, arrow down should select the next option
// - Arrow left, arrow up should select the previous option
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render } from 'react-dom'

const RadioGroup = React.createClass({
  getInitialState() {
    return {
      isValid: true
    }
  },

  propTypes: {
    value: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    children: PropTypes.node
  },

  componentWillReceiveProps(nextProps) {
    const children = React.Children.toArray(nextProps.children)
    const currentIndex = children.findIndex(child => child.props.value === nextProps.value)
    this.setState({
      isValid: currentIndex !== -1
    })
  },

  onKeyDown(evt) {
    console.log(evt.key);
    const children = React.Children.toArray(this.props.children)
    const currentIndex = children.findIndex(child => child.props.value === this.props.value)
    console.log(currentIndex)
    if (evt.key === 'ArrowUp') {
      const next = children[currentIndex + 1]
      if (next) {
        this.props.onUpdate(next.props.value)
      }
    } else if (evt.key === 'ArrowDown') {
      const prev = children[currentIndex - 1]
      if (prev) {
        this.props.onUpdate(prev.props.value)
      }
    }  else if (evt.key === 'Enter') {
      if (currentIndex !== -1) {
        this.props.onUpdate(children[currentIndex].props.value)
      }
    }
  },

  render() {
    const { value, onUpdate, children } = this.props
    return (
      <div onKeyDown={this.onKeyDown}>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            isSelected: child.props.value === value,
            onSelect: onUpdate
          })
        )}
        {!this.state.isValid && <p>Error!</p>}
      </div>
    )
  }
})

const RadioOption = React.createClass({
  propTypes: {
    value: PropTypes.string,
    isSelected: PropTypes.bool,
    onSelect: PropTypes.func,
    children: PropTypes.node.isRequired,
  },

  render() {
    const { value, isSelected, onSelect, children } = this.props

    return (
      <div
        onClick={() => onSelect(value)}
        tabIndex="0"
        style={{ cursor: 'pointer' }}
      >
        <RadioIcon isSelected={isSelected} />
        {children}
      </div>
    )
  }
})

const RadioIcon = React.createClass({
  propTypes: {
    isSelected: PropTypes.bool.isRequired
  },

  render() {
    return (
      <div
        style={{
          borderColor: '#ccc',
          borderSize: '3px',
          borderStyle: this.props.isSelected ? 'inset' : 'outset',
          height: 16,
          width: 16,
          display: 'inline-block',
          cursor: 'pointer',
          background: this.props.isSelected ? 'rgba(0, 0, 0, 0.05)' : ''
        }}
      />
    )
  }
})

const App = React.createClass({
  getInitialState() {
    return {
      selectedValue: 'fm'
    }
  },

  updateSelected() {
    this.setState({ selectedValue: 'tape '})
  },

  onUpdate(selectedValue) {
    this.setState({ selectedValue })
  },

  render() {
    return (
      <div>
        <h1>♬ It's about time that we all turned off the radio ♫</h1>

        <RadioGroup value={this.state.selectedValue} onUpdate={this.onUpdate}>
          <RadioOption value="am">AM</RadioOption>
          <RadioOption value="fm">FM</RadioOption>
          <RadioOption value="tape">Tape</RadioOption>
          <RadioOption value="aux">Aux</RadioOption>
        </RadioGroup>
        <button onClick={() => this.onUpdate('tape')} >
          Set to tape
        </button>
        <button onClick={() => this.onUpdate('aux')} >
          Set to aux
        </button>
        <button onClick={() => this.onUpdate('blah')} >
          Set to blah
        </button>
      </div>
    )
  }
})

render(<App/>, document.getElementById('app'))
