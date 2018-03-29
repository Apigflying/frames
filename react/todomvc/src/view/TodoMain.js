import React, {Component} from 'react';
//组件之间传递数据
class TodoMain extends Component {
  constructor(props){
    super();
    // this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    let [e,item,index] = arguments;
    console.log(e,item,index);
  }
  render() {
    let {getParentData} = this.props;
    return (
      <ul>
        {getParentData.map((item,idx)=>(<li key={idx} onClick={e=>this.handleClick(e,item,idx)}>{item.text}</li>))}
      </ul>
    )
  }
}
export default TodoMain;