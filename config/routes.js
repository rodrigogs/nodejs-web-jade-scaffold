'use strict';

const router = require('express').Router();
const logger = require('winston');

module.exports = (app) => {

    router.use((req, res, next) => {
        // Remove express http headers
        res.removeHeader('X-Powered-By');
        res.locals.user = req.user;
        next();
    });

    /*------------------- Routes -------------------*/
    
    const passport = require('./passport');
    const auth = require('../app/routes/auth');
    const index = require('../app/routes/index');

    router.use(passport);
    router.use(auth);
    router.use(index);

    /*----------------- Routes API -----------------*/

    const user = require('../app/routes/api/user');

    router.use('/api/user', user);

    /*--------------- Error Handler ----------------*/

    router.use((req, res, next) => {
        let err = new Error('Not Found');
        err.statusCode = 404;
        next(err);
    });

    router.use((err, req, res, next) => {
        logger.error(err);

        /**
         * Remove Error's `stack` property. We don't want
         * users to see this at the production env
         */
        if (req.app.get('env') !== 'development') {
            delete err.stack;
        }

        res.status(err.statusCode || 500).render('error', {error: err});
    });

    app.use(router);
};