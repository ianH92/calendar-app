let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let passport = require('passport');
let LocalStrategy = require('passport-local');
let expressSession = require('express-session');

let index = require('./routes/index');
let users = require('./routes/users');
let events = require('./routes/events');
let days = require('./routes/days');
let todo = require('./routes/todo');

let User = require('./models/User.js');

let app = express();

//Setting up the mongoose database connection
let mongoosePassword = require('./password.js');
let mongoose = require('mongoose');
let mongoDatabase = mongoosePassword.databasePassword();
mongoose.connect(mongoDatabase, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;
var dataBase = mongoose.connection;
dataBase.on('error', console.error.bind(console, 'MongoBD database connection failure'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/events', events);
app.use('/day', days);
app.use('/todo', todo);

let secretString = mongoosePassword.secret();
app.use(expressSession({secret: secretString}));
app.use(passport.initialize());
app.use(passport.session());

//Creating the local strategy for passport.js
passport.use(new LocalStrategy.Strategy(
	function(username, password, done) {
		User.findOne({username: username}, function(error, user) {
			if(error) {
				return done(error);
			} else if(user === null) {
				return done(null, false);
			} else {
				return (password === user.password) ? done(null, user) : done(null, false);
			}
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(error, user) {
		done(err, user);
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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