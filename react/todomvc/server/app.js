import express from 'express';
const app = express();

app.get('/getData',(req,res,next)=>{
  res.send({
    data:'测试数据'
  })
})

app.listen(3001);