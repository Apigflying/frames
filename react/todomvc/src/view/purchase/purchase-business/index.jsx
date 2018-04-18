import React, {Component} from 'react';
import 'style/index.scss';
//面包屑导航
class BrandMag extends Component {
  componentDidMount(){
    console.log(this.props.router);
    
  }
  routerWillLeave(nextLocation){
    console.log('adv')
    return false
  }
  render() {
    return (
      <div>
        这是一个文
      </div>
    )
  }
}
export default BrandMag;
