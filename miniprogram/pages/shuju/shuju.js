// pages/shuju/shuju.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: []
  },
  compare: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   var openid=app.globalData.openid
    console.log(openid)
      }
  ,

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    var all = [];
    var alll = [];
    var that = this;
    var finduser = app.globalData.finduser
    console.log(finduser)
    const db = wx.cloud.database();

    db.collection('SY_LHDataAnalysis_shuju').where({
       finduser: finduser,
    
    })
      .get({
      
        success(res) {
          that.setData({
            alll: res.data
          })
          console.log(res.data)
          var all = that.data.alll
          var countResult = alll.length;
          that.setData({
          all: all
        })
    //       for (let i = 0; i < countResult; i++) {

    //         var id = alll[i]._id
    //         console.log(_id)
    //         db.collection('SY_LHDataAnalysis_shuju').doc(id).get({
    //   success(res) {
    //     all.push(res.data)
    //     all[0].sort(that.compare("Sort_index"));//排序
    //     that.setData({
    //       all: all[0]
    //     })
    //     console.log(res.data)
    //   }
    // })
    // }
        }
      })
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

  }
})