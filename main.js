'use strict';

const CONFIG = require('./config/config.json');
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
const i18n = require('i18n');
const cookieParser = require('cookie-parser');

const app = express();

app.locals.AUTH_CONFIG = CONFIG.AUTH;

app.use(helmet());
app.use(logger(CONFIG.HTTP_LOG_CONFIG));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true}));
app.use(flash());
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());

// i18n config: https://github.com/mashpie/i18n-node#list-of-configuration-options
i18n.configure({
    directory: path.join(__dirname, 'locales'),
    locales: CONFIG.LOCALES
});

app.use(i18n.init);

// Static resources
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use('/static', express.static(path.join(__dirname, 'app/public')));

// View engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// Config
require('./config/routes')(app);
require('./config/mongoose');
require('./config/passport');

module.exports = app;