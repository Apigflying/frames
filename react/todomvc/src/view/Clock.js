import React, {Component} from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ...props,
      date: this
        .$moment()
        .format('hh:mm:ss'),
      timer: 0
    }
  }
  componentWillMount() {
    console.log('WillMount');
  }
  componentDidCatch() {
    console.log('DidCatch');
  }
  componentWillReceiveProps(value) {
    console.log('Props Change:', value);
    this.setState(Object.assign(this.state, value))
    // this.setState((oldVal,val)=>{   console.log(oldVal,val); })
  }
  componentDidMount() {
    this.$nextTick(() => {
      console.log(this.state.value);
    })
    console.log('DidMount');
    this.timer = setInterval(() => {
      this.setState({
        date: this
          .$moment()
          .format('hh:mm:ss')
      })
    }, 1000)
  }
  componentWillUnmount() {
    console.log('WillUnMount');
    clearInterval(this.timer)
  }
  commitCustomEvent() {
    let val = '...'
    this
      .props
      .childCommit(val)
  }
  render() {
    return (
      <div className="clock">
        <div>{this.state.value}</div>
        {this.state.date}
        {this
          .state
          .todos
          .map((item, index) => {
            return <div key={index}>{item.text}</div>
          })}
        <div>
          {this.props.rootState}
          <button onClick={this
            .commitCustomEvent
            .bind(this)}>点击</button>
        </div>
      </div>
    )
  }
}
export default Clock;