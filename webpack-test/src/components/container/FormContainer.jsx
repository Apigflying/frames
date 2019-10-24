import React, { Component } from "react";
import Input from "../presentational/Input.jsx";
import {getTestData} from '@/apis/test';


class FormContainer extends Component {
  state = {
    seo_title: ""
  };
  componentDidMount() {
    this.getTestData();
  }
  handleChange = (event) =>{
    console.log(this.props);
    this.setState({ 'seo_title': event.target.value });
  }

  // getTestData = async ()=>{
  //   const data = await getTestData();
  //   console.log(data);
  // }
  render() {
    const { seo_title } = this.state;
    return (
      <form id="article-form">
        <Input
          text={seo_title}
          label="seo_title"
          type="text"
          id="seo_title"
          value={seo_title}
          handleChange={this.handleChange}
        />
        <div onClick={this.getTestData}>1234</div>
      </form>
    );
  }
}

export default FormContainer;