import axios from 'axios';

const baseURL = 'http://192.168.2.13:9000';

const service = axios.create({
  baseURL,
  timeout:6000,
  withCredentials:true
});

service.interceptors.request.use(config=>config,err=>{
  Promise.reject(err)
})
service.interceptors.response.use(res=>res,err=>Promise.reject(err));

export default service;


