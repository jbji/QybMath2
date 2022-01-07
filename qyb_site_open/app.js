var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//路由
var auth = require('./routes/controllers/auth_controller.js');
var indexRouter = require('./routes/index');
var contestRouter = require('./routes/contest');
var authRouter = require('./routes/auth');
var dashboardRouter = require('./routes/dashboard');
var resRouter = require('./routes/res');
var userRouter = require('./routes/user');
var infoRouter = require('./routes/info');

//使用模板
var expressLayouts = require('express-ejs-layouts');

//cookie and session, use mysql to store session.
var flash = require('connect-flash');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var dbSet = require('./models/db_settings');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setup session
var sessionStore = new MySQLStore({
  host: dbSet.host,
  port: dbSet.port,
  user: dbSet.user,
  password: dbSet.password,
  database: dbSet.database_session
});

app.use(session({
  secret: "secsec114",
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
//设置flash，这步要在路由之前
app.use(flash());


//layout
app.use(expressLayouts);

//获得session中的成功和失败消息
app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = err;
  if (msg) res.locals.message = msg;
  next();
});

//路由
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user',userRouter);
app.use('/contest',contestRouter);
app.use('/dashboard',dashboardRouter);
app.use('/info',infoRouter);
app.use('/res',resRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(auth.auth);

// 显示错误信息
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: '出错啦!' });
});

process.env.PORT = 3000;

module.exports = app;
