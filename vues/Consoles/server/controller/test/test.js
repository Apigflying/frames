import Base from 'common/base.js';
import fs from 'fs';
import path from 'path';
import ccap from 'ccap'
class Test extends Base {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.downLoad = this.downLoad.bind(this);
    this.getValidateCode = this.getValidateCode.bind(this);
  }
  // 下载文件
  async downLoad (req, res) {
    await this.sleep();
    const { name } = req.body;
    /* 可读取数据库，生成xlsx文件 */
    var buff = fs.readFileSync(path.dirname(__filename) + `/${ name }.xlsx`);
    res.set('Content-Disposition', "excel.xlsx");
    res.end(buff);
  }
  async getData (req, res, next) {
    let data = await this.sleep({
      content: '这里是测试内容'
    });
    res.send(data);
  }
  getValidateCode (req, res, next) {
    let ip = req.ip;
    console.log(ip);
    // 将sessionId放到cookie中返回给客户端
    var ary = ccap().get();
    var txt = ary[0];
    var buf = ary[1];
    req.session.validateCode = txt;
    var base64Str = buf.toString('base64');
    var datauri = 'data:image/png;base64,' + base64Str;
    res.end(datauri);
  }
  async validateCode (req, res, next) {
    const {validateCode} = req.body;
    if(req.session.validateCode === validateCode.toUpperCase()){
        return res.send({
          success:true
        });
      }
    res.send({success:false});
  }
}
export default new Test();
