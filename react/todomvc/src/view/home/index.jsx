import React, {Component} from 'react';
import store from 'store';
import TestStore from './testStore';
import 'style';
import 'style/base/base.scss';
import './home.scss';

//组件之间传递数据
class Home extends Component {
  state = {
    num:store.getState()
  }
  
  componentDidMount(){
    store.subscribe(this.setNumState.bind(this))
  }
  setNumState(){
    this.setState({
      num:store.getState()
    })
  }
  render() {
    return (
      <main>
        abc
        <TestStore value={this.state.num} add={e=>store.dispatch({type:'add'})} reduce={e=>store.dispatch({type:'reduce'})}/>
      </main>
    )
  }
}
export default Home;