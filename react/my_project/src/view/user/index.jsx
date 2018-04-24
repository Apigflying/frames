//从react引入React和Component
import React, { Component } from "react";
import { getMarkdown } from "api/getData";
class User extends Component {
  state = {
    data: null,
    html: { __html: "" }
  };
  componentWillMount() {
    let html = '';
    getMarkdown().then(res => {
      import('showdown').then(showdown => {
        const converter = new showdown.Converter()
        html = converter.makeHtml(res.data)
        this.setState({
          html: { __html: html }
        });
      })
      
    });
  }
  render() {
    return (
      <div>
        {/* {this.state.data ? this.state.data : <p>正在加载</p>} */}

        <div className="form-group">
          <textarea name="field" id="fieldTest" cols="30" rows="10" />
        </div>
        <div dangerouslySetInnerHTML={this.state.html} />
      </div>
    );
  }
  componentDidMount() {
    
  }
}
export default User;
