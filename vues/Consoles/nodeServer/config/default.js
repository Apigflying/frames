'use strict';

module.exports = {
	port: 4000,//服务端口号
	url: 'mongodb://localhost:27017/elm',//数据库
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
		    secure:   false,
		    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
  },
  alloworigin:false
}