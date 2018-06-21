import express from 'express';
import Base from './base/base';
const app = express();

let sleep = (data,time = 2000)=> {
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      resolve(data)
    }, time);
  })
}

app.get('/getData',async (req,res,next)=>{
  let data = await sleep({
    data:'测试数据'
  });
  res.send(data);
})

app.listen(3001);