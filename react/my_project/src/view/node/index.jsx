//从react引入React和Component
import React ,{Component} from 'react';
class Nodejs extends Component{
  componentWillMount(){
    console.log(this.props.match);
  }
  render(){
    return 'nodejs'
  }
}
export default Nodejs;