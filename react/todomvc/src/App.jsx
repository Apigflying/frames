import React from 'react';
import 'antd/dist/antd.css';
import 'view/public/public.scss';
// import { getData } from 'api/getDatas';
import Home from 'view/home/index';

class App extends React.Component {
  render () {
    return (
      <div>
        <Home/>
      </div>
    )
  }
}
export default App;
