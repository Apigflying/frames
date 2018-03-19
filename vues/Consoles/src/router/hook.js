import tools from 'utils/tools'
import {
  getOpenId,
} from 'request'
import config from 'src/config'
//全局钩子函数
export async function global(to, from, next) {
  // let {
  //   data: openIdData
  // } = await getOpenId()
  // config.openId = openIdData.content
  next()
}