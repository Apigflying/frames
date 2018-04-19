//从react引入React和Component
import React ,{Component} from 'react';
class About extends Component{
  componentWillMount(){
    console.log(this.props.match);
  }
  render(){
    return '关于'
  }
}
export default About;