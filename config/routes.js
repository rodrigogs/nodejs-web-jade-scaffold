'use strict';

const logger = require('winston');

module.exports = (app) => {

    app.use((req, res, next) => {
        // Remove express http headers
        res.removeHeader('X-Powered-By');
        res.locals.user = req.user;
        next();
    });

    /*------------------- Routes -------------------*/

    const auth = require('../app/routes/auth');
    const index = require('../app/routes/index');

    app.use(auth);
    app.use(index);

    /*------------------- Routes API -------------------*/

    const user = require('../app/routes/api/user');

    app.use('/api/user', user);

    /*--------------- Error Handler ----------------*/

    app.use((req, res, next) => {
        let err = new Error('Not Found');
        err.statusCode = 404;
        next(err);
    });

    app.use((err, req, res, next) => {
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
};