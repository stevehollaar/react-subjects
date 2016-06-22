/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> "submits" the form
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onChange> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
//
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

const Form = React.createClass({
  getInitialState() {
    return {};
  },

  childContextTypes: {
    onSubmit: React.PropTypes.func.isRequired,
    registerTextInput: React.PropTypes.func.isRequired,
    textInputsCanSubmit: React.PropTypes.bool.isRequired
  },

  getChildContext() {
    return {
      onSubmit: this.props.onSubmit,
      onChange: this.handleChange,
      registerTextInput: this.onRegisterTextInput,
      textInputsCanSubmit: Object.keys(this.state.textInputs).length === 1
    }
  },

  handleChange(name, value) {
    this.setState({
      [name]: value
    })
  },

  onRegisterTextInput(name, value) {
    this.setState({
      textInputs: Object.assign(this.state.textInputs, {
        [name]: value
      })
    })
  },

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})

const SubmitButton = React.createClass({
  contextTypes: {
    onSubmit: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <button onClick={this.context.onSubmit}>
        {this.props.children}
      </button>
    )
  }
})

const TextInput = React.createClass({
  contextTypes: {
    onSubmit: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    textInputsCanSubmit: React.PropTypes.bool.isRequired
  },

  onKeyPress(evt) {
    if (this.props.textInputsCanSubmit && evt.key === 'Enter') {
      this.context.onSubmit()
    }
  },

  onChange(evt) {
    this.onChange(this.props.name, evt.currentTarget.value)
  },

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        onKeyPress={this.onKeyPress}
        onChange={this.onChange}
      />
    )
  }
})

const App = React.createClass({
  handleSubmit() {
    alert('YOU WIN!')
  },

  handleChange(values) {
    console.log(values)
  },

  render() {
    return (
      <div>
        <h1>This isn't even my final <code>&lt;Form/&gt;</code>!</h1>

        <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <p>
            <TextInput name="firstName" placeholder="First Name"/> {' '}
            <TextInput name="lastName" placeholder="Last Name"/>
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    )
  }
})

render(<App/>, document.getElementById('app'))
