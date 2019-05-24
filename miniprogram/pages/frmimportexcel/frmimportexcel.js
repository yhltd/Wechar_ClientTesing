Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: [],
    num: 0,
    yeshu: 1,
    filepath1: '',
    zongyeshu: 1
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
  shangyiye: function() {
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
    that.read_json()
  },
  xiayiye: function() {
    var that = this
    console.log(that.data.yeshu)
    console.log(that.data.zongyeshu)
    var yeshu = that.data.yeshu + 1
    if (yeshu > that.data.zongyeshu) {
      yeshu = that.data.zongyeshu
    }
    that.setData({
      yeshu: yeshu
    })
    console.log(that.data.yeshu)
    console.log(that.data.zongyeshu)
    that.read_json()
  },
  read_excel() {
    var that = this;
    //参数2
    wx.cloud.downloadFile({
      // fileID: 'cloud://yhltd-vw99c.7968-yhltd-vw99c/hljlc_xiangmujihuahuizongbiao/data/01-项目计划汇总表.xlsm', // 文件 ID
      // fileID:'cloud://yhltd-vw99c.7968-yhltd-vw99c/SY_LHDataAnalysis/txt/database_export-pxn4qHt7T2WJ.json', // 文件 ID,
      fileID: 'cloud://yhltd-vw99c.7968-yhltd-vw99c/SY_LHDataAnalysis/txt/data.json',
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
            }, )
            console.log('内容', list_split_txt[0]);

          }

        });
        //读取2
        wx.request({
          url: filepath1, //json数据地址
          headers: {
            'Content-Type': 'application/json'
          },
          success: function(res) {
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
  clear_json() {
    var all = [];
    var that = this;
    that.setData({
      all: all
   
    })
  },

  read_json() {
    var all = [];
    var that = this;
    //参数2
    wx.cloud.downloadFile({
      // fileID: 'cloud://yhltd-vw99c.7968-yhltd-vw99c/SY_LHDataAnalysis/txt/database_export-pxn4qHt7T2WJ.json',
      // fileID: 'cloud://yhltd-vw99c.7968-yhltd-vw99c/SY_LHDataAnalysis/txt/System  Info_20190516231055.json',
      fileID: 'cloud://yhltd-vw99c.7968-yhltd-vw99c/SY_LHDataAnalysis/txt/data.json',
      // 文件 ID,
      success: res => {
        console.log(res.tempFilePath)
        var filepath1 = wx.env.USER_DATA_PATH + '/01-项目计划汇总表.xlsm';
        filepath1 = "https://7968-yhltd-vw99c-1259252488.tcb.qcloud.la/SY_LHDataAnalysis/txt/data.json?sign=00b84b11f8e30e6a2db01f50e61d2aa1&t=1558618048";
        //  var logCfg = AppDomain.CurrentDomain.BaseDirectory + "config/log4net.config";
        //  console.log(logCfg);
        // filepath1 = res.tempFilePath   
      
        that.setData({
            filepath1: res.tempFilePath
          }),
          console.log('文件路径111：', that.data.filepath1);
          //读取2
          wx.request({
            url: filepath1, //json数据地址
            headers: {
              'Content-Type': 'application/json'
            },
            success: function(res) {
              var length = res.data.imgListData.length

              var zongyeshu = parseInt((res.data.imgListData.length - 1) / 10) + 1
              // console.log(zongyeshu)
              that.setData({
                zongyeshu: zongyeshu
              })
              // console.log('name2:' + res.data.imgListData[0].beizhu)
              //将获取到的json数据，存在名字叫list_data的这个数组中
              for (var x = ((that.data.yeshu - 1) * 10); x < (that.data.yeshu * 10); x++) {
                all.push(res.data.imgListData[x])
              }
              console.log(all)
              that.setData({
                  all: all
                  //res代表success函数的事件对，data是固定的，imgListData是上面json数据中imgListData
                },
                // console.log(that.data.all)
              )

              // 上传数据库
              const db = wx.cloud.database()

              db.collection('SY_LHDataAnalysis_json').get({
                success: function(res) {

                  if (length > res.data.length) {
                    for (var j = 0; j < length - res.data.length; j++) {
                      db.collection('SY_LHDataAnalysis_json').add({
                        data: {
                          index: j + res.data.length,
                          xuhao_A: that.data.all[j + res.data.length].xuhao_A,
                          tiaomaneirong_B: that.data.all[j + res.data.length].tiaomaneirong_B,
                          tuhao_C: that.data.all[j + res.data.length].tuhao_C,
                          mingcheng_D: that.data.all[j + res.data.length].mingcheng_D,
                          caizhi_E: that.data.all[j + res.data.length].caizhi_E,
                          shuliang_F: that.data.all[j + res.data.length].shuliang_F,
                          danwei_G: that.data.all[j + res.data.length].danwei_G,
                          taoshu_H: that.data.all[j + res.data.length].taoshu_H,
                          xiangmujiaoqi_I: that.data.all[j + res.data.length].xiangmujiaoqi_I,
                          zongshuliang_J: that.data.all[j + res.data.length].zongshuliang_J,
                          wuliuzhouqi_K: that.data.all[j + res.data.length].wuliuzhouqi_K,
                          zhuangpeizhouqi_L: that.data.all[j + res.data.length].zhuangpeizhouqi_L,
                          lingjianchengpinzhouqi_M: that.data.all[j + res.data.length].lingjianchengpinzhouqi_M,
                          shifouxuyao_N: that.data.all[j + res.data.length].shifouxuyao_N,
                          bianmianchulizhouqi_O: that.data.all[j + res.data.length].bianmianchulizhouqi_O,
                          lingjianbanchengpinzhouqi_P: that.data.all[j + res.data.length].lingjianbanchengpinzhouqi_P,
                          beizhu_Q: that.data.all[j + res.data.length].beizhu_Q,
                          genchuineirong_R: that.data.all[j + res.data.length].genchuineirong_R,
                          genchuijiedian_S: that.data.all[j + res.data.length].genchuijiedian_S,
                          xiatushijian_T: that.data.all[j + res.data.length].xiatushijian_T,
                          xiaruriqi_U: that.data.all[j + res.data.length].xiaruriqi_U,
                          xiangmubiaohao_V: that.data.all[j + res.data.length].xiangmubiaohao_V,
                          tuhao1_W: that.data.all[j + res.data.length].tuhao1_W



                        }
                      })
                    }
                  }
                }
              })
              for (var i = 0; i < res.data.imgListData.length; i++) {
                db.collection('SY_LHDataAnalysis_json').where({
                  index: i,
                }).get({
                  success: function(res) {

                    // res.data 包含该记录的数据                  
                    db.collection('SY_LHDataAnalysis_json').doc(res.data[0]._id).update({
                        // data 传入需要局部更新的数据
                        data: {
                          xuhao_A: that.data.all[res.data[0].index].xuhao_A,
                          tiaomaneirong_B: that.data.all[res.data[0].index].tiaomaneirong_B,
                          tuhao_C: that.data.all[res.data[0].index].tuhao_C,
                          mingcheng_D: that.data.all[res.data[0].index].mingcheng_D,
                          caizhi_E: that.data.all[res.data[0].index].caizhi_E,
                          shuliang_F: that.data.all[res.data[0].index].shuliang_F,
                          danwei_G: that.data.all[res.data[0].index].danwei_G,
                          taoshu_H: that.data.all[res.data[0].index].taoshu_H,
                          xiangmujiaoqi_I: that.data.all[res.data[0].index].xiangmujiaoqi_I,
                          zongshuliang_J: that.data.all[res.data[0].index].zongshuliang_J,
                          wuliuzhouqi_K: that.data.all[res.data[0].index].wuliuzhouqi_K,
                          zhuangpeizhouqi_L: that.data.all[res.data[0].index].zhuangpeizhouqi_L,
                          lingjianchengpinzhouqi_M: that.data.all[res.data[0].index].lingjianchengpinzhouqi_M,
                          shifouxuyao_N: that.data.all[res.data[0].index].shifouxuyao_N,
                          bianmianchulizhouqi_O: that.data.all[res.data[0].index].bianmianchulizhouqi_O,
                          lingjianbanchengpinzhouqi_P: that.data.all[res.data[0].index].lingjianbanchengpinzhouqi_P,
                          beizhu_Q: that.data.all[res.data[0].index].beizhu_Q,
                          genchuineirong_R: that.data.all[res.data[0].index].genchuineirong_R,
                          genchuijiedian_S: that.data.all[res.data[0].index].genchuijiedian_S,
                          xiatushijian_T: that.data.all[res.data[0].index].xiatushijian_T,
                          xiaruriqi_U: that.data.all[res.data[0].index].xiaruriqi_U,
                          xiangmubiaohao_V: that.data.all[res.data[0].index].xiangmubiaohao_V,
                          tuhao1_W: that.data.all[res.data[0].index].tuhao1_W
                        }
                      }

                    )
                  },
                })
              }

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

  },
})