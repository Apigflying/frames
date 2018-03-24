//index.js
//获取应用实例
const app = getApp()
const {request} = require('../../utils/fetch.js')


Page({
  data: {
    custom: 'custom-root-status',
    dialog:'dialog-root-status'
  },
  sleep(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        resolve('1234')
      },2000)
    })
  },
  // custom 组件的自定义事件
  parentEvent(val){
    console.log(val.detail);
    this.setData({
      custom:val.detail
    })
  },
  onTap(val){
    //测试dialog组件会不会触发这里的事件
    console.log(val)
    this.setData({
      custom:val
    })
  },
  clickMe(val){
    console.log(val);
  },
  //------------------------钩子函数----------------------------
  async onLoad() {
    let {data:{code,result:{songs}}} = await request('search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA');
    this.setData({
      currentSong:{
        imgUrl:songs[0].artists[0].img1v1Url
      }
    })
  },

})
