// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  console.log('' + event.a)
  try {
    return await db.collection('SY_LHDataAnalysis_shuju').where({
      _id: event.a
    }).remove()
  } catch (e) {
    console.error(e)
  }
}