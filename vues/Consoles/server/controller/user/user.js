import crypto from 'crypto'
import formidable from 'formidable'
import jwt from 'jsonwebtoken'
import dtime from 'time-formater'
//-----------------------------
import Base from 'common/base.js'

class User extends Base {
  constructor() {
    super();
  }
  logIn(){}
  signUp(){}
}
export default new User();
