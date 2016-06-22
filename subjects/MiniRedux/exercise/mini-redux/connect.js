import React from 'react'

export default function connect(mapStateToProps) {
  return function (Component) {
    return React.createClass({
      contextTypes: {
        store: React.PropTypes.object.isRequired
      },

      getInitialState() {
        return { state: this.context.store.getState()}
      },

      componentDidMount() {
        this.context.store.listen(this.updateState)
      },

      updateState() {
        this.setState({ state: this.context.store.getState()})
      },

      render() {
        return (
          <Component
            {...mapStateToProps(this.state.state)}
            dispatch={this.context.store.dispatch}
          />
        )
      }
    })
  }
}
