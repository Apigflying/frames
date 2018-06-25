import React from 'react';

export default class Count extends React.Component {
  render(){
    return (
      <div>
        {this.props.count}
      </div>
    )
  }
}