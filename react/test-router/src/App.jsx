import React, {Component} from 'react';
import Nav from 'view/nav';
import RouterIndex from 'router'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav/>
        <RouterIndex/>
      </div>
    );
  }
}

export default App;
