'use strict';

const AuthService = require('../services/auth');

module.exports = {

    /**
     * Index action
     */
    index: (req, res, next) => {
        res.render('auth/register');
    },

    /**
     * Register action
     */
    register: (req, res, next) => {
        AuthService.register(req.body, (err, message, user) => {
            if (err) {
                return next(err);
            }

            if (message) {
                req.flash('warning', req.__(message));
                return res.render('auth/register', {user: user});
            }

            if (!user) {
                req.flash('warning', req.__('user.error-creating'));
                return res.render('auth/register', {user: user});
            }

            req.flash('success', req.__('user.created'));
            res.redirect('/');
        });
    }
};