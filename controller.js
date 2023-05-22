/*
 * @Author: your name
 * @Date: 2020-12-26 14:16:05
 * @LastEditTime: 2023-05-22 15:24:56
 * @LastEditors: 荛子
 * @Description: In User Settings Edit
 * @FilePath: /koa/controllers/controller.js
 */
import fs from 'fs'

/**
 * @description: 递归获取controllers下所有js文件及其对应路径
 * @param {*} folder
 * @return {*}
 */
function getAllJsFiles(folder) {
  let files = fs.readdirSync(folder)
  let temporaryFilesPathArr = []
  for (let index = 0; index < files.length; index++) {
    const f = files[index]
    let path = folder + '/' + f
    if (f.endsWith('.js')) {
      const fileName = path.split('/controllers')[1]
      temporaryFilesPathArr.push({
        fileName,
        mapping: require(`./controllers${fileName}`).default
      })
    }
    if (fs.lstatSync(path).isDirectory()) {
      temporaryFilesPathArr = temporaryFilesPathArr.concat(getAllJsFiles(path))
    }
  }
  return temporaryFilesPathArr
}

/**
 * @description: 设置api路由
 * @param {*} router
 * @param {*} filePathArr
 * @return {*}
 */
function setApiUrl(router, filePathArr) {
  filePathArr.forEach((f) => {
    const parentPath = f.fileName.substring(0, f.fileName.length - 3)
    for (let key in f.mapping) {
      if (key.startsWith('GET ')) {
        const path = parentPath + '/' + key.substring(4)
        router.get(path, f.mapping[key])
        console.log(`register URL mapping: GET ${path}`)
      } else if (key.startsWith('POST ')) {
        const path = parentPath + '/' + key.substring(5)
        router.post(path, f.mapping[key])
        console.log(`register URL mapping: POST ${path}`)
      }
    }
  })
}

export default function () {
  let router = require('koa-router')()
  const filePathArr = getAllJsFiles(__dirname + '/controllers')
  setApiUrl(router, filePathArr)
  return router.routes()
}
