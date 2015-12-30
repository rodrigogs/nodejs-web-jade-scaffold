'use strict';

const RegisterService = require('../services/register');

module.exports = {

    /**
     * Index action
     */
    index: (req, res, next) => {
        res.render('register/index');
    },

    /**
     * Register action
     */
    register: (req, res, next) => {
        RegisterService.register(req.body, (err, message, user) => {
            if (err) {
                return next(err);
            }

            if (message) {
                req.flash('warning', req.__(message));
                return res.render('register/index', {user: user});
            }

            if (!user) {
                req.flash('warning', req.__('user.error-creating'));
                return res.render('register/index', {user: user});
            }

            req.flash('success', req.__('user.created'));
            res.redirect('/');
        });
    }
};