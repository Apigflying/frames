import React, {Component} from 'react';
//组件之间传递数据
import Dialog from '../components/Dialog/index';
class TodoMain extends Component {
  constructor(props){
    super();
    this.state = {
      isDialogShow:false
    }
    // this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    let [e,item,index] = arguments;
    console.log(e,item,index);
  }
  closeDialog(){
    this.setState({
      isDialogShow:false
    })
  }
  showDialog(){
    this.setState({
      isDialogShow:true
    })
  }
  componentDidMount(){
    //相当于mounted
    this.textInput.focus();
  }
  componentWillMount(){
    // 这个相当于created，无法获取到节点
    console.log(this.textInput);
    
  }
  render() {
    let {getParentData} = this.props;
    return (
      <div>
        <input type="text" ref={ele=>{this.textInput = ele}}/>
        <Dialog isDialogShow={this.state.isDialogShow} closeDialog={this.closeDialog.bind(this)}>
        </Dialog>
        <button onClick={this.showDialog.bind(this)}>点开dialog</button>
        <ul>
          {getParentData.map((item,idx)=>(<li key={idx} onClick={e=>this.handleClick(e,item,idx)}>{item.text}</li>))}
        </ul>
      </div>
      
    )
  }
}
export default TodoMain;