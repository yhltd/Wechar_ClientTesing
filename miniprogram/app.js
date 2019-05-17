//app.js

var dateUtil = require('./utils/date.js');
App({
  globalData: {
    finduser: "",
    passwod: "",
    adminis: "",
    userInfo: null,
    header: {
      'Cookie': ''

    }, 
    appid: 'wxf4c1f213d8b03948', //填写微信小程序appid
    secret: '6f8ba7ec15aa21b23e495097ec3290b5',//填写微信小程序secret
    imageInfopath: "cloud://yhltd-028b95.7968-yhltd-028b95/tupian/",
    cookie: "",
    nickName: "",
    gender: "",
    avatarUrl: "",
    province: "",
    city: "",
    country: "",
    language: "",
    tabBar1: {
      
      "list": [
        // {
        //   id1: '红桃',
        //   "iconPath": "/images/红心.png",
        //   // "clas": "menu-item4",
        //   active: false
        // },
        // {
        //   id1: '黑桃',
        //   "iconPath": "/images/黑桃.png",
        //   // "clas": "menu-item4",
        //   active: true
        // },
        // {
        //   id1: '方片',
        //   "iconPath": "/images/方片.png",
        //   // "clas": "menu-item4",

        //   active: false
        // },
        // {
        //   id1: '草花',
        //   "iconPath": "/images/草花.png",
        //   // "clas": "menu-item4",

        //   active: false
        // },
        {
          id: 'K',
          idd:0,
          "text": "K",
          "clas": "menu-item1",
          active: false
        },
        {
          id: 'Q',
          idd: 0,
          "text": "Q",
          "clas": "menu-item1",
          active: false
        },
        {
          id: 'J',
          idd: 0,
          "text": "J",
          "clas": "menu-item1",
          active: false
        },
        {
          id: "10",
          idd: 0,
          "text": "10",
          "clas": "menu-item1",
          active: false
        },
       
        {
          id: "9",
          idd: 9,
          "text": "9",
          "clas": "menu-item1",
          active: false
        },
        {
          id: "8",
          idd: 8,
          "text": "8",
          "clas": "menu-item1",
          active: false
        },
        {
          id: "7",
          idd: 7,
          "text": "7",
          "clas": "menu-item1",
          active: false
        },
        {
          id: "6",
          idd: 6,
          "text": "6",
          "clas": "menu-item1",
          active: false
        },
        
        {
          id: "5",
          idd: 5,
          "text": "5",
          "clas": "menu-item1",
          active: false
        },
        {
          id: "4",
          idd: 4,
          "text": "4",
          "clas": "menu-item1",
          active: false
        },
        {
          id: "3",
          idd: 3,
          "text": "3",
          "clas": "menu-item1",
          active: false
        },
        {
          id: "2",
          idd: 2,
          "text": "2",
          "clas": "menu-item1",
          active: false
        },
       
       
        {
          id: "A",
          idd: 1,
          "text": "A",
          "clas": "menu-item1",
          active: false
        },
        // {
        //   "text": "删除",
        //   "clas": "menu-item3",
        //   active: false
        // },
        // {
        //   "text": "重置",
        //   "clas": "menu-item3",
        //   active: false
        // },
        // {
        //   "text": "确认",
        //   "clas": "menu-item3",
        //   active: false
        // },
      ],
      "position": "bottom",
      
        idx : 0
    },
    startStation: '',
    endStation: '',
    date: dateUtil.getToday()
  },


  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。

    var curPageArr = getCurrentPages();    //获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象
    var pagePath = curPage.route;    //当前页面url
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }

    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态    
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },

  editTabBar1: function () {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
 



  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    var that = this
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.getUserInfo({
              success: function (res) {
                var objz = {};
                objz.avatarUrl = res.userInfo.avatarUrl;
                objz.nickName = res.userInfo.nickName;
                //console.log(objz);
                wx.setStorageSync('userInfo', objz);//存储userInfo
              }
            });


            var d = that.globalData;//这里存储了appid、secret、token串  
            var l = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + d.appid + '&secret=' + d.secret + '&js_code=' + res.code + '&grant_type=authorization_code';

            wx.setStorageSync('url', l);
            wx.request({
              url: l,
              data: {},
              method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
              // header: {}, // 设置请求的 header  
              success: function (res) {
                var obj = {};
                obj.openid = res.data.openid;
                obj.expires_in = Date.now() + res.data.expires_in;

                wx.setStorageSync('openid', obj);//存储openid  
                console.log(obj);
              }
            });
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
    }


  },
})
