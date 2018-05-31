import Base from '../../common/base.js';
class Test extends Base {
  constructor () {
    super();
    this.getData = this.getData.bind(this);
  }
  async getData (req, res, next) {
    let data = await this.sleep({
      content: '这里是测试内容'
    });
    res.send(data);
  }
}
export default new Test();
