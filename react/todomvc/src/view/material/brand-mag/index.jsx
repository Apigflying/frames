import React, {Component} from 'react';
import 'style/index.scss';
//面包屑导航
class BrandMag extends Component {
  state={
    inputVal:'',
    todolist:[]
  }
  getInputVal(e){
    this.setState({
      inputVal:e.target.value
    })
  }
  addTodo(){
    if(!this.state.inputVal)return;
    let todolist = this.state.todolist;
    todolist.push({
      complated:false,
      text:this.state.inputVal,
    })

    this.setState({
      todolist,
      inputVal:'',
    })
  }
  toogleComplate(i){
    console.log(i);
    let todolist = this.state.todolist;
    todolist[i].complated = !todolist[i].complated
    this.setState({
      todolist
    })
  }
  render() {
    let {todolist} = this.state
    return (
      <div>
        单文件实现todolist
        <input placeholder="addtodo" value={this.state.inputVal} onChange={this.getInputVal.bind(this)}/>
        <input value="addTodo" type="button" onClick={this.addTodo.bind(this)}/>
        <ul>
          {todolist.map((item,index)=>(
            <li key={index} onClick={e=>this.toogleComplate(index)} style={{
              textDecoration:item.complated?'line-through':'none'
            }}>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default BrandMag;
