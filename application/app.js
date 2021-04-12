var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

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



app.use('/', indexRouter);
app.use('/users', usersRouter);



module.exports = app;
