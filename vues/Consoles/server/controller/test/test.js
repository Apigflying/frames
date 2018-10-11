import Base from 'common/base.js';
import fs from 'fs';
import path from 'path';
class Test extends Base {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.downLoad = this.downLoad.bind(this);
  }
  // 下载文件
  async downLoad(req,res){
    await this.sleep();
    const {name} = req.body;
    /* 可读取数据库，生成xlsx文件 */
    var buff = fs.readFileSync(path.dirname(__filename) + `/${name}.xlsx`);
    res.set('Content-Disposition', "excel.xlsx");
    res.end(buff);
  }
  async getData (req, res, next) {
    let data = await this.sleep({
      content: '这里是测试内容'
    });
    res.send(data);
  }
  postData(req,res,next){
    let {value} = req.body;
    res.send({
      a:1,
      value
    })
  }
}
export default new Test();
