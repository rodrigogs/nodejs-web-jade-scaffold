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
        AuthService.authenticate('local', null, (err, user) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                req.flash('danger', req.__('auth.failed'));
                return res.redirect('auth/login');
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }

                return res.redirect('/');
            });
        })(req, res, next);
    },

    /**
     * Facebook action
     */
    facebook: (req, res, next) => {
        AuthService.authenticate('facebook')(req, res, next);
    },

    /**
     * FacebookCallback action
     */
    facebookCallback: (req, res, next) => {
        AuthService.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/auth/login'
        })(req, res, next);
    },

    /**
     * Logout action
     */
    logout: (req, res, next) => {
        req.logout();
        res.redirect('/');
    }
};