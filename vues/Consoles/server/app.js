import path from 'path';
import express from "express";
// import db from './mongoDB/db.js';
import router from 'router/index.js';
import configLite from 'config-lite';
import bodyParser from 'body-parser';
import history from 'connect-history-api-fallback';
import cookieParser from 'cookie-parser';
import session from 'express-session';
const config = configLite(__dirname);
const app = express();

//允许跨域请求
if (config.alloworigin) {
  app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", '3.2.1')
    if (req.method == 'OPTIONS') {
      res.send(200);
    } else {
      next();
    }
  });
}
// 处理post请求的参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('keyboard cat'));
// app.set('trust proxy', 1) //如果使用HTTPCookie不会被设置。这时，如果使用了代理，则应该在Expres中设置"trust proxy"
app.use(session({
  secret: 'keyboard cat',// 必须项。该值用于session ID的cookie签名。
  name: 'session-name',// session ID的Cookie名，该值会设置到response中，并可在request中读取。默认值为'connect.sid'
  // cookie: {
  //   maxAge: 10*60*1000,// number（毫秒），用于指定Set-Cookie的Expires属性。设置后，Cookie将在指定时间后失效。
  //   secure: true,// 将设置为true时，不使用HTTPS连接时，客户端将不会回传Cookie。
  // },
  resave: false,// 强制将 session 保存回session存储区，即使在请求期间session从不被修改。该值默认为true
  saveUninitialized: true,// 强制将未初始的session保存到存储中。Session在新创建而未修改时，是未初始化状态
}));


router(app);

app.use(history());
// 静态资源文件目录
app.use(express.static(path.join(__dirname, '..', '/dist')));

app.listen(config.port, () => {
  console.log('server listen at http://localhost:' + config.port);
});
