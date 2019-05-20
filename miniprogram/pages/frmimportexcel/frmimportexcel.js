// miniprogram/pages/frmimportexcel/frmimportexcel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  wx_up() {
    var myThis = this;
    var filename;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        const cloudPath = 'SY_LHDataAnalysis/txt/data' + tempFilePaths[0].match(/\.[^.]+?$/)[0]

        wx.cloud.uploadFile({
            cloudPath,
            filePath: tempFilePaths[0],
            name: 'data',
            success(res) {
              myThis.setData({
                statusCode: res.statusCode,
                filename: tempFilePaths[0]
              })
            }
          },
          console.log(tempFilePaths[0])
        )
      }
    })
  },
  read_excel() {
    var that = this;
    //参数2
    wx.cloud.downloadFile({
      // fileID: 'cloud://yhltd-vw99c.7968-yhltd-vw99c/hljlc_xiangmujihuahuizongbiao/data/01-项目计划汇总表.xlsm', // 文件 ID
      fileID:'cloud://yhltd-vw99c.7968-yhltd-vw99c/SY_LHDataAnalysis/txt/database_export-pxn4qHt7T2WJ.json', // 文件 ID,
      success: res => {
        console.log(res.tempFilePath)
        // getData(id, this);
        var filepath1 = wx.env.USER_DATA_PATH + '/01-项目计划汇总表.xlsm';
        console.log('文件路径111：', filepath1);
        // filepath1 = '/images/data.txt';
        filepath1 = res.tempFilePath

        var FileManager = wx.getFileSystemManager();
        FileManager.readFile({
        
          filePath: filepath1,
          encoding: 'utf8',
          success: function(data) {

            console.log('文件内容', data.data);
            list_split_txt = data.data.split(',');
            that.setData({
                list_split_txt: list_split_txt
              },
            )
            console.log('内容', list_split_txt[0]);
 
          }

        });
       //读取2
        wx.request({
          url: filepath1,//json数据地址
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            //console.log(res.data.imgListData[0].tag)
            //将获取到的json数据，存在名字叫list_data的这个数组中
            that.setData({
              list_data: res.data,
              //res代表success函数的事件对，data是固定的，imgListData是上面json数据中imgListData
            })
          }
        })
 
      },
      fail: console.error

    })


  },
  read_json() {
   var all = [];
    var that = this;
    //参数2
    wx.cloud.downloadFile({ 
      // fileID: 'cloud://yhltd-vw99c.7968-yhltd-vw99c/SY_LHDataAnalysis/txt/database_export-pxn4qHt7T2WJ.json',
      fileID: 'cloud://yhltd-vw99c.7968-yhltd-vw99c/SY_LHDataAnalysis/txt/System  Info_20190516231055.json',
       // 文件 ID,
      success: res => {
        // console.log(res.tempFilePath)        
        var filepath1 = wx.env.USER_DATA_PATH + '/01-项目计划汇总表.xlsm';
        
        filepath1 = res.tempFilePath   
        console.log('文件路径111：', filepath1);     
        //读取2
        wx.request({
          url: filepath1,//json数据地址
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res.data.imgListData)
            console.log('name2:' + res.data.imgListData[0].beizhu)
            //将获取到的json数据，存在名字叫list_data的这个数组中
            that.setData({
              all: res.data.imgListData
              //res代表success函数的事件对，data是固定的，imgListData是上面json数据中imgListData
            },
              console.log(that.data.all)
            )
          }
        })

      },
      fail: console.error

    })


  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})