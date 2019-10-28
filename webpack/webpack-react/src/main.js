import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/Pages/App';
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<App/>, wrapper) : false;