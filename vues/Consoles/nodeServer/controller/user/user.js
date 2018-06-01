import crypto from 'crypto'
import formidable from 'formidable'
import jwt from 'jsonwebtoken'
import dtime from 'time-formater'
import Base from '../../common/base.js'
import { createToken } from '../../common/token.js'
import UserModel from '../../models/user/user.js'

class User extends Base {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.getToken = this.getToken.bind(this);
    this.signup = this.signup.bind(this);
    this.encryption = this.encryption.bind(this);
  }
  async login (req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, filds, files) => {
      if (err) {
        res.send(err)
      }
      // filds 为post请求的data参数  console.log(filds);
      const { username, password } = filds;
      // 判断username是否存在，判断password是否存在，username用trim等
      try {
        const userMes = await UserModel.findOne({ username });
        if (!userMes) {
          return res.send({
            message: '用户不存在'
          });
        }
        if (userMes.password !== this.encryption(password)) {// 验证密码
          return res.send({
            message: '密码错误'
          })
        }
        const token = await this.getToken({
          username: userMes.username,
          password: userMes.password,
        }, {
            expiresIn: 10080//token到期时间
          });
        res.send({
          message: "登录成功",
          token
        })
      } catch (err) {
        console.log(err);
        res.send({
          message: '发生错误了',
        })
      }
    })
  }
  async getToken () { // 通过用户名密码 换取 token
    let token = await createToken(...arguments);
    console.log(token);
    return token
  }
  async signup (req, res) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, filds, file) => {
      const { username, password } = filds;
      try {
        const newpassword = this.encryption(password);
        console.log(newpassword);
        const user = {
          username,
          password: newpassword,
          createtime: dtime().format('YYYY-MM-DD HH:mm'),
          authlist: []
        }
        let data = await User.create(user);
        console.log('create返回结果：', data);
        res.send({
          message: "注册成功",
        })
      } catch (e) {
        console.log(e)
        res.send({
          message: '发生错误了',
        })
      }
    })
  }
  encryption (password) {
    const newpassword = this.Md5(this.Md5(password).sub(2, 7) + this.Md5(password));
    return newpassword;
  }
  Md5 (password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
  }
}
export default new User();
