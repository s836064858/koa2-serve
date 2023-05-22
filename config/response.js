/*
 * @Author: your name
 * @Date: 2020-12-26 14:42:19
 * @LastEditTime: 2023-05-22 13:49:02
 * @LastEditors: 荛子
 * @Description: In User Settings Edit
 * @FilePath: /koa/controllers/response.js
 */
import errorMessage from './errorMessage'
const successData = (data) => {
  return {
    success: true,
    message: '调用成功',
    data,
    code: 200
  }
}
const failData = (code) => {
  return {
    success: false,
    message: errorMessage[code] || '操作失败',
    data: null,
    code
  }
}
export default {
  successData,
  failData
}
