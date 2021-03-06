module.exports = {
	//=>WEB服务端口号
	PORT: 3000,

	//=>CROS跨域相关信息
	CROS: {
		ALLOW_ORIGIN: 'http://localhost:8080',
		CREDENTIALS: true
	},

	//=>SESSION存储相关信息
	SESSION: {
		secret: 'ZFPX',
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 30
		}
	}
};