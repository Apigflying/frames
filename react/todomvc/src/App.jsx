import React, {Component} from 'react';
import PublicHeader from 'view/public/PublicHeader';
import RouterIndex from 'router/index';
import PublicAside from 'view/public/PublicAside';
import 'antd/dist/antd.css';
import 'view/public/public.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [], //初始状态
    }
  }
  //----------------------RENDER----------------------
  render() {
    return (
      <div className="App">
        {/* <PublicHeader promise={new Promise((res,rej)=>{
          setTimeout(() => {
            res(123)
          }, 2000);
        })}/> */}
        {/* <PublicAside/> */}
        <RouterIndex/>
      </div>
    );
  }
}

export default App;
