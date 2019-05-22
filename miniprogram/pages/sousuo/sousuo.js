// pages/sousuo/sousuo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:"",
    all: [],
    yeshu: 1,
    zongyeshu:1
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
 var all= [];
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
      
      var length = res.data.length

      var zongyeshu = parseInt((res.data.length - 1) / 10) + 1
  
      that.setData({
        zongyeshu: zongyeshu
      })
    
      for (var x = ((that.data.yeshu - 1) * 10); x < (that.data.yeshu * 10); x++) {
       
        all.push(res.data[x])
      
      }
    
  
      that.setData({
        all: all
        
      })
     

      
      
         that.setData({
          all:res.data
           })
      
    }
    })
 
},
shangyiye: function () {
    var that = this
    var yeshu = that.data.yeshu - 1
    console.log(yeshu)
    console.log(that.data.yeshu)
    console.log(that.data.zongyeshu)
    if (yeshu == 0) {
      yeshu = 1
    }

    that.setData({
      yeshu: yeshu
    })
    console.log(that.data.yeshu)
    console.log(that.data.zongyeshu)
  that.sousuo()
  },
  xiayiye: function () {
    var that = this
   
    var yeshu = that.data.yeshu + 1
    if (yeshu > that.data.zongyeshu) {
      yeshu = that.data.zongyeshu
    }
    that.setData({
      yeshu: yeshu
    })
    
    that.sousuo()
  },
})