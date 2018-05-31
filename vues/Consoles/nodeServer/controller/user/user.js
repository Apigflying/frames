import Base from '../../common/base.js';
import formidable from 'formidable';
class User extends Base {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }
  async login (req, res, next) {
    let data = await this.sleep({
      content: '登录'
    });
    res.send(data);
  }
}
export default new User();
