/*
 * @Author: your name
 * @Date: 2020-12-26 15:23:03
 * @LastEditTime: 2023-05-22 15:37:32
 * @LastEditors: 荛子
 * @Description: In User Settings Edit
 * @FilePath: /koa/config/mysql_config.js
 */
const mysql = require('mysql')
const mysql_config = {
  host: '*',
  port: 3306,
  user: 'root',
  password: '*',
  database: 'keyword',
  charset: 'UTF8MB4'
}
let pool = mysql.createPool(mysql_config)

let query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (!err) {
        connection.query(sql, params, (err, data) => {
          if (err) reject(err)
          else resolve(data)
          connection.release()
        })
      } else {
        reject(err)
        connection.release()
      }
    })
  })
}

module.exports = query
