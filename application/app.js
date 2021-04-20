var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var errorPrint = require('./helpers/debug/debugprinters').errorPrint;
var successPrint = require('./helpers/debug/debugprinters').successPrint;

var app = express();

app.engine(
	"hbs",
	handlebars({
		layoutsDir: path.join(__dirname, "views/layouts"),
		partialsDir: path.join(__dirname, "views/partials"),
		extname: ".hbs",
		defaultLayout : "home",
		helpers: {



		},
	})
)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, (req, resp) => {
	console.log('app is running on port 3000');
})

app.use( (err, req, resp, next) => {
	resp.send('error 404');
})

app.use((req, res, next) => {
	requestPrint(req.url);
	next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
	errorPrint(err);
	res.render('error', {err_message: err})
})



module.exports = app;
