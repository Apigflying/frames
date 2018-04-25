import Mock from 'mockjs';
import {loginByUsername} from './login';

console.log(loginByUsername)
Mock.setup({
  timeout:'1000-2000'
})

Mock.mock(/\/test\/login/, 'post', loginByUsername);
