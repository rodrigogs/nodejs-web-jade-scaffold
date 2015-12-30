'use strict';

const passport = require('passport');

module.exports = {

    /**
     * Authenticate
     */
    authenticate: (type, args, callback) => {
        if (type === 'local') {
            return passport.authenticate('local', callback);
        }
        if (type === 'facebook') {
            return passport.authenticate('facebook', args);
        }
    }
};