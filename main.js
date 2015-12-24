'use strict';

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const flash = require('flash');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'whatever', resave: false, saveUninitialized: true}));
app.use(flash());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

// Static resources
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/static', express.static(path.join(__dirname, 'app/public')));

// View engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// Config
require('./config/passport')(app);
require('./config/routes')(app);
require('./config/mongoose');

module.exports = app;