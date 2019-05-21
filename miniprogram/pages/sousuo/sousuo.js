// pages/sousuo/sousuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    all: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindKeyInput:function(e){
  
 var inputValue= e.detail.value
    console.log(inputValue)
    this.setData({
      inputValue: inputValue
    })
},
  soubutton:function(){
this.sousuo()
  },
sousuo:function(e){
  
  var that=this
  that.setData({
    all:[]
  })
  var inputValue = that.data.inputValue
  const db = wx.cloud.database()
  db.collection('SY_LHDataAnalysis_json').where({
    xuhao_A:String(inputValue),
  }).get({
    success: function (res) {
      
         that.setData({
          all:res.data
           })
      
    }
    })
 
}

})