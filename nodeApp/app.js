var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const i18n = require('./lib/i18nConfigure')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/features');
var changeLocale = require('./routes/api/change-locale.js');
const LoginController = require('./controllers/loginController');
const PrivadoController = require('./controllers/privadoController');
const session = require('express-session');
const sessionAuth = require('./lib/sessionAuth.js')

var app = express();

require('./lib/connectMongoose');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express)


/**
 * Middlewares de nuestra App
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Rutas del API
 */
app.use('/api/anuncios', require('./routes/api/anuncios'));
app.use('/api/tags', require('./routes/api/tags'));

// i18n Setup

app.use(i18n.init)

const loginController = new LoginController();
const privadoController = new PrivadoController();

//Set up de sesiones del website

app.use(session({
  name: "nodeapp-session",
  secret: "jbsdlgsflsu8ew848484ehsisgb",
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2 días
  }
}))

// hacemos que req.session esté disponible en las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})
/**
 * Rutas del website
 */
app.use('/', indexRouter);
app.use('/features', usersRouter);
app.use('/change-locale', changeLocale);
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);
app.get('/privado', sessionAuth('admin'), privadoController.index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500); 
  res.render('error');
 
});

module.exports = app;
