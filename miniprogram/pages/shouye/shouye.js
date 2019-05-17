// pages/shouye/shouye.js
var util = require('../../utils/util.js');
var util = require('../../utils/util.js');
var app = getApp();
var showmsg = '';
var showToastAuto = function(that) {
  var self = that;
  wx.showToast({
    title: '闲赢：' + String(showmsg) + '%',
    image: '/images/btn.png',
    // image: 'https://7968-yhltd-vw99c-1258471393.tcb.qcloud.la/SY_LHDataAnalysis/btn.png?sign=455f4df0922c815857202c0bf7dbaa9a&t=1554721629',
    duration: 2000,
    success: function(res) {
      self.setData({
        msg: '消息提示消失！'
      });
    }
  })
}
var cleardata = function(that) {
  console.log("150偏差")
  const MAX_LIMIT = 1000;
  const db = wx.cloud.database();
  var listAll_canshu1 = [];
  db.collection('SY_LHDataAnalysis_shuju').limit(MAX_LIMIT).where({
      shuju1: parseInt(that.data.id),
      shuju2: parseInt(that.data.id2),
      shuju3: parseInt(that.data.id3),
      shuju4: parseInt(that.data.id4),
      shuju5: parseInt(that.data.id5),
      shuju6: parseInt(that.data.id6)
    })
    .get({
      success: res => {
        listAll_canshu1.push(res.data)
        console.log('time:' + listAll_canshu1[0].length);
        for (var i = 0; i < listAll_canshu1[0].length; i++) {
          console.log('removeid:' + listAll_canshu1[0][i]._id);
          //删别人的自己的都可以
          wx.cloud.callFunction({
            name: 'removeid',
            data: {
              a: listAll_canshu1[0][i]._id
            },
            success: res => {},
            fail: err => {
              console.error('[云函数]  调用失败：', err)
            }

          })
        }
        // wx.showToast({
        //   title: listAll_canshu1[0].length + '条删除成功',
        // })

      },

    })

}

function getData(id, page) {
  // 从本地存储获取数据

  var arr = wx.getStorageSync("txt");
  arr.forEach(function(item) {
    if (arr.length) {
      console.log('ty:' + arr.length + '----' + item)
      //  遍历数据并根据id显示当前记事本内容
      if (item.id == id) {
        page.setData({
            //  匹配记事本后将id与content绑定到页面实例
            id: item.id,
            content: item.content
          },
          console.log('1212:' + content)

        )
      }
    }
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenName: true,
    hiddenName2: true,
    hiddenName3: true,
    hiddenName4: true,
    hiddenName5: true,
    hiddenName6: true,
    hiddenName7: true,
    idd: 0,
    idd2: 0,
    idd3: 0,
    idd4: 0,
    idd5: 0,
    idd6: 0,
    idd7: 0,
    id: 0,
    id2: 0,
    id3: 0,
    id4: 0,
    id5: 0,
    id6: 0,
    id7: 0,
    listAll: [],
    msg: '',
    xianmsg: 0,
    zhuangmsg: 0,
    list_split_txt: [],
    Canshu_listAll: [],
    canshu1: '',
    loading: false,

    canshu2: ''
    // winup_time : 0,
    // wintime : 0

  },
  compare: function(property) {
    return function(a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },
  clickMe: function(e) {
    var idd = e.target.id
    console.log(idd)
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  click: function(e) {
    var id = e.target.id
    var idd = e.target.dataset.id
    console.log(id)
    console.log(idd)
    this.setData({
      hiddenName: !this.data.hiddenName,
      id: id,
      idd: idd,
    })
    this.clickMe2()
  },
  clickMe2: function(e) {

    this.setData({
      hiddenName2: !this.data.hiddenName2
    })

  },
  click2: function(e) {
    var id2 = e.target.id
    var idd2 = e.target.dataset.id
    console.log(id2)
    this.setData({
      hiddenName2: !this.data.hiddenName2,
      id2: id2,
      idd2: idd2,
    })
    this.clickMe3()
  },
  clickMe3: function(e) {

    this.setData({
      hiddenName3: !this.data.hiddenName3
    })
  },
  click3: function(e) {
    var id3 = e.target.id
    var idd3 = e.target.dataset.id
    console.log(id3)
    this.setData({
      hiddenName3: !this.data.hiddenName3,
      id3: id3,
      idd3: idd3
    })
    this.clickMe4()
  },
  clickMe4: function(e) {

    this.setData({
      hiddenName4: !this.data.hiddenName4
    })
  },
  click4: function(e) {
    var id4 = e.target.id
    var idd4 = e.target.dataset.id
    console.log(id4)
    this.setData({
      hiddenName4: !this.data.hiddenName4,
      id4: id4,
      idd4: idd4
    })
    // this.clickMe5()
  },
  clickMe5: function(e) {

    this.setData({
      hiddenName5: !this.data.hiddenName5
    })
  },
  click5: function(e) {
    var id5 = e.target.id
    var idd5 = e.target.dataset.id
    if (this.data.idd == 10 || this.data.idd2 == 10 || this.data.idd3 == 10 || this.data.idd4 == 10) {

      wx.showModal({
        title: '警告！',
        content: '不符合规则，无法录入！',
        showCancel: false,
        confirmColor: '#007aff',

      })
      this.setData({
        hiddenName5: !this.data.hiddenName5
      })

      return
    }
    console.log('55')
    console.log(id5)
    this.setData({
      hiddenName5: !this.data.hiddenName5,
      id5: id5,
      idd5: idd5
    })
    // this.clickMe6()
  },
  clickMe6: function(e) {

    this.setData({
      hiddenName6: !this.data.hiddenName6
    })
  },
  click6: function(e) {
    var id6 = e.target.id
    var idd6 = e.target.dataset.id
    if (this.data.idd == 10 || this.data.idd2 == 10 || this.data.idd3 == 10 || this.data.idd4 == 10) {

      wx.showModal({
        title: '警告！',
        content: '不符合规则，无法录入！',
        showCancel: false,
        confirmColor: '#007aff',

      })
      this.setData({
        hiddenName6: !this.data.hiddenName6
      })

      return
    }
    console.log(id6)
    this.setData({
      hiddenName6: !this.data.hiddenName6,
      id6: id6,
      idd6: idd6
    })
  },
  //参数2
  clickMe7: function(e) {

    this.setData({
      hiddenName7: !this.data.hiddenName7
    })
  },
  click7: function(e) {
    var id7 = e.target.id
    var idd7 = e.target.dataset.id
    console.log(id7)
    this.setData({
      hiddenName7: !this.data.hiddenName7,
      id7: id7,
      idd7: idd7
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var that = this

    var adminis = app.globalData.adminis
    var finduser = app.globalData.finduser

    console.log(adminis)
    console.log(finduser)

    app.editTabBar1(); //底部栏
    //定义一个字符串数组
    var obj = wx.getStorageSync("openid")
    var idd = that.data.id;
    var openid = obj.openid;
    console.log(openid)

  },
  qingkong: function() {
    var that = this
    that.setData({
      id: "",
      id2: "",
      id3: "",
      id4: "",
      id5: "",
      id6: "",
      xianmsg: 0,
      zhuangmsg: 0

    })
  },
  jisuan: function(e) {
    var that = this;
    var listAll = [];
    var list_split_txt = [];
    var listAll_canshu1 = [];
    var winup_time = 0;
    var wintime = 0;
    const MAX_LIMIT = 1000;
    const db = wx.cloud.database();
    db.collection('SY_LHDataAnalysis_shuju').limit(MAX_LIMIT).where({
        finduser: app.globalData.finduser
      })
      .get({
        success(res) {
          listAll.push(res.data)
          listAll[0].sort(that.compare("shuju8")); //排序
          that.setData({
              listAll: listAll[0]
              // listAll: res.data
            },
            // console.log(listAll)
          )
          //分析逻辑
          var countResult = listAll[0].length;

          // let arrayItem = that.data.listAll;
          // for (let item of arrayItem) 
          // for (var i = 0; i < listAll[0].length; i++) 
          //之前逻辑 如果是 最后一次是闲赢则往上推
          var xianwin = 0;

          for (var index in listAll[0]) {

            if (index == 0) {
              if (listAll[0][index].shuju7 == '闲') {
                xianwin = 1
              }
            }
            if (xianwin == 1 && listAll[0][index].shuju7 == '闲') {
              // winup_time = winup_time + 1
            } else if (xianwin == 1 && listAll[0][index].shuju7 != '闲') {
              break
            }
          }

          //参数1
          console.log('that.data.id' + that.data.id)
          console.log('that.data.id2' + that.data.id2)
          console.log('that.data.id3' + that.data.id3)
          console.log('that.data.id4' + that.data.id4)
          console.log('that.data.id5' + that.data.id5)
          console.log('that.data.id6' + that.data.id6)
          //新加逻辑筛选之前出现过的相同牌型的次数
          db.collection('SY_LHDataAnalysis_shuju').limit(MAX_LIMIT).where({
              shuju1: parseInt(that.data.id),
              shuju2: parseInt(that.data.id2),
              shuju3: parseInt(that.data.id3),
              shuju4: parseInt(that.data.id4),
              shuju5: parseInt(that.data.id5),
              shuju6: parseInt(that.data.id6)
            })
            .get({

              success(res) {
                listAll_canshu1.push(res.data)
                listAll_canshu1[0].sort(that.compare("shuju8")); //排序
                that.setData({

                    listAll_canshu1: listAll_canshu1[0],
                    // listAll: res.data
                  },
                  winup_time = listAll_canshu1.length,

                  // console.log('winup_timefff:' +  winup_time),
                  // console.log('listAll_canshu1内容', listAll_canshu1[0])
                )

                console.log('winup_time:' + winup_time)
                // console.log("xianwin:" + String(xianwin))
                if (xianwin == 0)
                  wintime = 50
                else {
                  var las = 0;
                  wintime = 50
                  // winup_time=1
                  console.log('listAll_canshu1.length:' + listAll_canshu1.length)
                  for (var i = 0; i < listAll_canshu1.length; i++) {
                    wintime = wintime + parseFloat(that.data.Canshu_listAll[0].canshu)
                  }

                  console.log('参数1=' + String(50) + '+' + String(parseFloat(that.data.Canshu_listAll[0].canshu)) + '=' + String(wintime))
                }


                //参数2
                wx.cloud.downloadFile({
                  fileID: 'cloud://yhltd-vw99c.7968-yhltd-vw99c/SY_LHDataAnalysis/txt/data.txt', // 文件 ID
                  success: res => {

                    console.log(res.tempFilePath)

                    // getData(id, this);

                    var filepath1 = wx.env.USER_DATA_PATH + '/data.txt';
                    // console.log('文件', filepath1);
                    // filepath1 = '/images/data.txt';
                    filepath1 = res.tempFilePath
                    // let txt = FileSystemManager.readFile(filepath, "utf-8")
                    // console.log(txt)
                    var FileManager = wx.getFileSystemManager();
                    FileManager.readFile({
                      filePath: filepath1,

                      encoding: 'utf8',

                      success: function(data) { //成功时

                        // console.log('文件内容', data.data);
                        list_split_txt = data.data.split(',');
                        that.setData({
                            list_split_txt: list_split_txt
                          },

                        )
                        // console.log('内容a', list_split_txt);           
                        // console.log('内容', list_split_txt[0]);

                        var can2data = 0;
                        // console.log(list_split_txt);
                        if (list_split_txt.length > 0 && winup_time > 0) {

                          var list_split_txt2 = list_split_txt[winup_time].split(' ');
                          if (list_split_txt2.length > 0)
                            // can2data = list_split_txt2[1] * 1.1;
                            console.log('idd7:----' + that.data.idd7)
                          if (that.data.idd7 != '' && that.data.idd7.length > 0) {

                            can2data = parseInt(that.data.idd7) * parseFloat(that.data.Canshu_listAll[0].canshu2);
                            console.log("输入的参数2 :" + String(parseInt(that.data.idd7)))
                          } else {
                            can2data = list_split_txt2[1] * parseFloat(that.data.Canshu_listAll[0].canshu2);

                            console.log("txt 行数 + 数字= " + String(winup_time) + '+' + String(list_split_txt2[1]))
                          }
                        }
                        // console.log("can2data=" + String(can2data))
                        // console.log(String(wintime) + '+' + String(can2data) + '=' + String(wintime + can2data))
                        showmsg = (wintime + can2data),
                          that.setData({
                            xianmsg: showmsg,
                            zhuangmsg: 100 - showmsg
                          }),
                          //清空参数2
                          that.data.idd7 = '',
                        console.log("X偏差：" + String(showmsg.toFixed(2)))
                        showToastAuto(that)
                        // 如果大于 150 清空历史数据
                      
                        if (parseFloat(showmsg) > 150 || parseFloat(showmsg) < -150) {
                          cleardata(that)
                        }
                      }

                    });
                  },
                  fail: console.error

                })
              }
            });
        } //sucee 1
      })
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

    var that = this;
    const db = wx.cloud.database();
    var Canshu_listAll = [];
    var canshu1, canshu2;
    db.collection('SY_LHDataAnalysis_canshu').where({

        name: app.globalData.finduser
      })
      .get({
        success(res) {

          Canshu_listAll.push(res.data)
          that.setData({
              Canshu_listAll: Canshu_listAll[0]
            },
            console.log(Canshu_listAll[0][0].canshu),

          )

        }
      })


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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  btzhixing: function() {
    this.setData({
      loading: !this.data.loading
    })
    cleardata(that)
  },
  canshu2click: function() {

    // wx.navigateTo({
    //   url: '/pages/frmcanshue_er/frmcanshue_er',
    // })
    // this.setData({
    //   hiddenName7: !this.data.hiddenName7
    // })
    this.clickMe7()
  },
  luru: function() {
    var shuju7 = '0'
    var that = this;
    var finduser = app.globalData.finduser
    const db = wx.cloud.database();
    var time = util.formatTimeblank(new Date());

    var zhuang1, zhuang2, zhuang3, xian1, xian2, xian3
    zhuang1 = parseInt(that.data.id);
    zhuang2 = parseInt(that.data.id2);
    zhuang3 = parseInt(that.data.id5);
    xian1 = parseInt(that.data.id3);
    xian2 = parseInt(that.data.id4);
    xian3 = parseInt(that.data.id6);
    console.log(zhuang1 + zhuang2)
    console.log(xian1 + xian2)
    console.log(zhuang3)
    console.log(xian3)
    if (zhuang1 + zhuang2 == 8 || zhuang1 + zhuang2 == 9) {
      if (xian1 + xian2 !== 8 || xian1 + xian2 !== 9) {
        console.log("庄家赢")
        shuju7 = "Z"
      }
      if (xian1 + xian2 == 8 || xian1 + xian2 == 9) {
        if (zhuang3 > xian3) {

          console.log("庄家赢")
          shuju7 = "Z"
        }

        if (zhuang3 < xian3) {
          console.log("闲家赢")
          shuju7 = "X"
        }
        if (zhuang3 = xian3) {
          console.log("平局")
          shuju7 = "X"
        }
      }
    } else if (xian1 + xian2 == 8 || xian1 + xian2 == 9) {
      console.log("闲家赢")
      shuju7 = "X"
    } else if (zhuang1 + zhuang2 == xian1 + xian2 && zhuang3 == xian3) {
      console.log("平局")
      shuju7 = "P"
    } else if (zhuang3 > xian3) {

      console.log("庄家赢")
      shuju7 = "Z"
    } else if (zhuang3 < xian3) {

      console.log("闲家赢")
      shuju7 = "X"
    } else if (zhuang3 == xian3) {

      console.log("平局")
      shuju7 = "P"
    }
    db.collection('SY_LHDataAnalysis_shuju').add({

      data: {

        shuju1: that.data.idd,
        shuju2: that.data.idd2,
        shuju3: that.data.idd3,
        shuju4: that.data.idd4,
        shuju5: that.data.idd5,
        shuju6: that.data.idd6,
        shuju7: shuju7,
        shuju8: parseFloat(String(time).replace("-", "").replace("-", "")),
        // _openid: 'oPTYg5dSDjYZ2mMdytcw_R8yq3PI1',
        finduser: finduser

      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({


        })
        wx.showToast({
          title: '录入成功',
        })
      }
    })
    this.qingkong()
  }
})