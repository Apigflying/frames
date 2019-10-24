import React from 'react'
import ReactDOM from 'react-dom'
import '@/styles/cssreset.css';
import FormContainer from "@/components/container/FormContainer.jsx";
const wrapper = document.getElementById("create-article-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;