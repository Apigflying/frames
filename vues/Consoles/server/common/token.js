import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'


export function createToken (payload, options) {
  return new Promise((resolve, reject) => {
    // path.dirname(__filename) 可以保证在引用文件时候，不受相对路径的影响，而使用绝对路径
    fs.readFile(path.dirname(__filename) + '/secret.key', function (err, data) {
      if (err) {
        reject(err)
      }
      console.log(payload, options);
      jwt.sign(payload, data, options, function (err, token) {
        resolve(token);
      })
    })
  })
};

export function verifyToken () {

}
