import React,{Component} from 'react';
import './index.scss';
class Dialog extends Component {
  constructor(props){
    super(props);
    this.handleClose=this.handleClose.bind(this)
  }
  handleClose(){
    this.props.closeDialog()
  }
  render(){
    return(
      <div className="dialogWrap" style={{"display":this.props.isDialogShow?'block':'none'}}>
        <div className="dialogCont">
          <header>
            {this.props.title}
          </header>
          <main>
            {this.props.conent}
            <button onClick={this.handleClose}>关闭弹窗</button>
          </main>
          {this.props.children}
        </div>
      </div>
    )
  }
}
Dialog.defaultProps = {
  isDialogShow:false,
  title:'这个是弹窗的标题',
  conent:'这里是弹窗内容',
  children:'abcd'
}
export default Dialog;