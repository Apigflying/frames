import React, { Component } from 'react';
import { getTestData } from '@/Apis/test';

export default class Home extends Component {
  state = {
    message:123
  };
  changeValue = async ()=> {
    const {data,success} = await getTestData();
    if(success === 1){
      this.setState({
        message:data.message
      })
    }else{
      this.setState({
        message:'为获取到数据!'
      })
    }
  }
  render() {
    const {message} = this.state;
    return (
      <div>
        This Is Home Default : {message}
        <div>
           <button onClick={this.changeValue}>Click To Change The Default</button> 
        </div>
      </div>
    );
  }
}
