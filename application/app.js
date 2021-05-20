var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');
var sessions = require('express-session');
var mysqlsession = require('express-mysql-session')(sessions);
var flash = require('express-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var logoutRouter = require('./routes/logout');
var postRouter = require('./routes/post');
var userRouter = require('./routes/user');
var commentRouter = require('./routes/comment');
//var dbRouter = require('./routes/dbtest');
var errorPrint = require('./helpers/debug/debugprinters').errorPrint;
var successPrint = require('./helpers/debug/debugprinters').successPrint;
var requestPrint = require('./helpers/debug/debugprinters').requestPrint;

var app = express();


app.engine(
	"hbs",
	handlebars({
		layoutsDir: path.join(__dirname, "views/layouts"),
		partialsDir: path.join(__dirname, "views/partials"),
		extname: ".hbs",
		defaultLayout : "home",
		helpers: {
			emptyObject: (obj) => {
				return !(obj.constructor === Object && Object.keys(obj).length == 0);
			}



		},
	})
)

var mysqlsessionstore = new mysqlsession({},require('./config/database'));
app.use(sessions({
	key: "csid",
	secret: "lmao",
	store: mysqlsessionstore,
	resave: false,
	saveUninitialized: false
}));
app.use(flash());
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.listen(3001, (req, resp) => {
	console.log('app is running on port 3000');
})

app.use( (err, req, resp, next) => {
	resp.send('error 404');
})

app.use((req, res, next) => {
	console.log("fjdslsfj");
	requestPrint(req.url);
	console.log("fjsfjsoufjsdfjs");
	next();
})

app.use((req, res, next) => {
	if(req.session.userid)
	{
		res.locals.logged = true;
	}
	next();
})

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/logout', logoutRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);
//app.use('/dbtest', dbRouter);

app.use('/style.css', (req, res, next) => {
	res.sendFile(__dirname + '/public/css/style.css');
	console.log("hi");
})

app.use('/registration.js', (req, res, next) => {
	res.sendFile(__dirname + '/public/js/registration.js');
})

app.use('/home.js', (req, res, next) => {
	res.sendFile(__dirname + '/public/js/home.js');
})

app.use('/post.js', (req, res, next) => {
	res.sendFile(__dirname + '/public/js/post.js');
})

app.use('/login.js', (req, res, next) => {
	res.sendFile(__dirname + '/public/js/login.js')
})

//app.use('/user', userRouter);

app.use((err, req, res, next) => {
	errorPrint(err);
	//res.render('error', {err_message: err})
})



module.exports = app;
