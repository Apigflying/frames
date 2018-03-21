let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mes: '这是出事数据',
    latitude: 67,
    longitude: 120,
    num:app.globalData.num,
    arr:['a',1,2,3,4,5],
    staffA: { firstName: 'Hulk', lastName: 'Hu' },
    staffB: { firstName: 'Shang', lastName: 'You' },
    staffC: { firstName: 'Gideon', lastName: 'Lin' }
  },
  clickTest(e) {
    console.log(app.globalData.userInfo);
    this.setData(app.globalData.userInfo,'abc')
  },
  toindexs:function() {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  markertap(val) {
    console.log(val);
  },
  sleep(fn,time = 500){
    return new Pormise((resolve,reject)=>{
      setTimeout(() => {
        fn.apply(this,arguments);
      }, time);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad-----------')
    console.log(this.route);
    // this.sleep(function(){
    //   console.log(1234)
    // })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res.latitude);
        console.log(res.longitude);
      },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady-----------')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow----------')
  },
  onHide(){
    console.log('main中的hide钩子函数')
  }
})