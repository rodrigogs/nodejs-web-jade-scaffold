'use strict';

const passport = require('passport');

module.exports = {

    /**
     * Authenticate
     */
    authenticate: (req, callback) => {
        passport.authenticate('local', callback)(req);
    }
};