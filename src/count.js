const React = require('react')

const Count = React.createClass({
  getInitialState: function() {
    return {
      c: 0,
      t: null,
      timer_is_on: false
    };
  },

  componentDidMount: function() {
    this.startCount()
  },

  fn() {
    var c = this.state.c + 1
    this.setState({c})
  },

  timedCount() {
    this.interval = setInterval(this.fn, 1000);
  },

  startCount() {
    if (!this.state.timer_is_on) {
      var timer_is_on = true
      this.setState({timer_is_on})
      this.timedCount()
    }
  },

  stopCount() {
      clearInterval(this.interval);
      var timer_is_on = false
      this.setState({timer_is_on})
  },

  render() {
    return (
      <div className="ib fl mb1">
        {this.props.blewUp ? this.stopCount() : null }
        <div className="fl w3 ba blue f6">
          <p className="tc">{this.state.c}</p>
        </div>
        <div className="fl w3 f6 link dim br-pill ba ph3 ml1 mr1 dib green">
          <p onClick={this.startCount}>Start</p>
        </div>
        <div className="fl w3 f6 link dim br-pill ba ph3 dib red">
          <p onClick={this.stopCount}>Stop</p>
        </div>
      </div>
    )
  }
})

module.exports = Count
