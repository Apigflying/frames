//从react引入React和Component
import React ,{Component} from 'react';
import {getData} from 'api/getData';
import {postData} from 'api/postData';
class Index extends Component{
  getDataTest(){
    getData().then(res=>{
      console.log(res);
    })
  }
  postDataTest(){
    postData({
      name:'测试的name',
      time:+new Date()
    }).then(res=>{
      console.log(res);
    })
  }
  render(){
    return (
      <div>
        shouye
        <button onClick={this.getDataTest.bind(this)}>获取数据</button>


        <div>
          <button onClick={this.postDataTest.bind(this)}>post提交数据</button>
        </div>
      </div>
    )
  }
}
export default Index;