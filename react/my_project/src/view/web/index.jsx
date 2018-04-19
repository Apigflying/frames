//从react引入React和Component
import React ,{Component} from 'react';
class Web extends Component{
  componentWillMount(){
    console.log(this.props.match);
  }
  render(){
    return 'web'
  }
}
export default Web;