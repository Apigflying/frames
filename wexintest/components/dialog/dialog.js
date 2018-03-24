// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    fromParent:{
      type:String,
      default:'dialog的默认值'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dialog:this.fromParent
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(){
      this.triggerEvent('DialogEvent','dialog-change-parent-val')
    }
  }
})
