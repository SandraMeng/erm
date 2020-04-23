const CONFIG = require('./config'),
	  session = require('express-session'),
	  bodyParser = require('body-parser');

/*-CREATE SERVER-*/
const express = require('express'),
	  app = express();
app.listen(CONFIG.PORT, () => {
	console.log(`当前服务 起于${CONFIG.PORT}端口`);
});

/*-MIDDLE WARE-*/
app.use((req, res, next) => {
	const {
		ALLOW_ORIGIN,
		CREDENTIALS
	} = CONFIG.CROS;
	res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
	res.header("Access-Control-Allow-Credentials", CREDENTIALS);
	next();
});
app.use(session(CONFIG.SESSION));
app.use(bodyParser.urlencoded({
	extended: false
}));

/*-QUERY DATA-*/
const {
	readFile
} = require('./utils/promiseFS');

app.use(async (req, res, next) => {
	req.$departmentDATA = JSON.parse(await readFile('./json/department.json'));
	req.$jobDATA = JSON.parse(await readFile('./json/job.json'));
	req.$userDATA = JSON.parse(await readFile('./json/user.json'));
	next();
});

/*-ROUTE-*/
app.use('/user', require('./routes/user'));
app.use('/department', require('./routes/department'));
app.use('/job', require('./routes/job'));
