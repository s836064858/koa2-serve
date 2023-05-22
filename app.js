/*
 * @Author: your name
 * @Date: 2020-12-26 14:07:16
 * @LastEditTime: 2023-05-22 15:47:12
 * @LastEditors: 荛子
 * @Description: In User Settings Edit
 * @FilePath: /koa/app.js
 */
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import controller from './controller.js'
import responseData from './config/response.js'
const { failData } = responseData
const app = new Koa()

const log4Config = require('./config/logconfig')
const log4js = require('log4js')
log4js.configure(log4Config)

//处理跨域
app.use(
  cors({
    credentials: true
  })
)

app.use(bodyParser())

//记录请求日志
app.use(async (ctx, next) => {
  const logger = log4js.getLogger('reqLogger')
  if (ctx.request.method === 'GET') logger.info(ctx.request.method, ctx.request.url, '请求参数', JSON.stringify(ctx.query))
  else if (ctx.request.method === 'POST') logger.info(ctx.request.method, ctx.request.url, '请求参数', JSON.stringify(ctx.request.body))
  await next()
})
/**
 * @description: token鉴权校验
 * @param {*} token
 * @return {*}
 */
function checkToken(token, url) {
  let ignoreUrls = ['/folderName/test']
  let isIgnoreUrl = false
  ignoreUrls.forEach((ignoreUrl) => {
    if (url.includes(ignoreUrl)) isIgnoreUrl = true
  })
  if (isIgnoreUrl) return true
  const jwt = require('jsonwebtoken')
  try {
    let checkTokenSuccess = true
    jwt.verify(token, 'yuhao6855', (err) => {
      if (err) checkTokenSuccess = false
    })
    return checkTokenSuccess
  } catch (error) {
    return false
  }
}
app.use(async (ctx, next) => {
  try {
    const token = ctx.request.header.token
    const url = ctx.request.url
    if (!checkToken(token, url)) {
      ctx.response.body = failData(1002)
      console.log(url, 'token校验失败')
      throw Error('token校验失败')
    }
    await next()
    if (ctx.status === 404) ctx.body = '404 hh'
  } catch (error) {
    console.log(error)
  }
})
//动态加载controller
app.use(controller())

//本地运行
app.listen(3000, (err) => {
  if (err) {
    console.log('服务启动出错', err)
  } else {
    console.log('koa-server运行在' + 3000 + '端口')
  }
})

process.on('uncaughtException', function (err) {
  console.log(err)
  const logger = log4js.getLogger('errLogger')
  logger.info('未知报错：', JSON.stringify(err))
})
