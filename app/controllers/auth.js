'use strict';

const AuthService = require('../services/auth');

module.exports = {

    /**
     * Index action
     */
    index: (req, res, next) => {
        res.render('auth/login');
    },

    /**
     * Login action
     */
    login: (req, res, next) => {
        AuthService.authenticate(req, (err, user) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                req.flash('danger', req.__('auth.failed'));
                return res.redirect('/login');
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                return res.redirect('/');
            });
        });
    },

    /**
     * Logout action
     */
    logout: (req, res, next) => {
        req.logout();
        res.redirect('/');
    }
};