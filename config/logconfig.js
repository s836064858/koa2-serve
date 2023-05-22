/*
 * @Author: your name
 * @Date: 2021-09-22 14:45:58
 * @LastEditTime: 2022-07-04 16:13:13
 * @LastEditors: 荛子
 * @Description: In User Settings Edit
 * @FilePath: /koa/config/logconfig.js
 */
let path = require('path')
// 日志根目录
let baseLogPath = path.resolve(__dirname, '../logs')
// 请求日志目录
let reqPath = '/request'
// 请求日志文件名
let reqFileName = 'request'
// 请求日志输出完整路径
let reqLogPath = baseLogPath + reqPath + '/' + reqFileName
// 错误日志目录
let errPath = '/error'
// 错误日志文件名
let errFileName = 'error'
// 错误日志输出完整路径
let errLogPath = baseLogPath + errPath + '/' + errFileName
module.exports = {
  appenders: {
    // 所有的日志
    console: { type: 'console' }, // 请求日志
    reqLogger: {
      type: 'dateFile', // 日志类型
      filename: reqLogPath, // 输出文件名
      pattern: '-yyyy-MM-dd.log', // 后缀
      alwaysIncludePattern: true, // 上面两个参数是否合并
      encoding: 'utf-8', // 编码格式
      maxLogSize: 10000000 // 最大存储内容
    }, // 错误日志
    errLogger: {
      type: 'dateFile',
      filename: errLogPath,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 10000000
    }
  }, // 分类以及日志等级
  categories: {
    default: {
      appenders: ['console'],
      level: 'all'
    },
    reqLogger: {
      appenders: ['reqLogger'],
      level: 'info'
    },
    errLogger: {
      appenders: ['errLogger'],
      level: 'error'
    }
  }
}
