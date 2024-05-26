var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = express.Router();
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskRouter = require('./routes/task');
var goalRouter = require('./routes/goal');

var app = express();

const db = require('./db');
const dbUser = require('./db_use');

async function initializeDatabase() {
  try {
    await db.query('CREATE DATABASE IF NOT EXISTS todoeg');
    await db.query('USE todoeg');
    await db.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT NOT NULL,
        fecha DATE NOT NULL
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS goals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT NOT NULL,
        fecha DATE NOT NULL
      )
    `);

    console.log('Database and tables created successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    db.end();
  }
}

initializeDatabase();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.use((req,res,next) => {
  if(req.headers.authorization && req.headers.authorization === '123456'){
    next();
  }else{
    res.status(401).json({error: 'No auth'});
  }
});


app.use(cors());
app.use('/', router)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/task', taskRouter);
app.use('/goal', goalRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
