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
        RegisterService.register(req.body, (err, errors, user) => {
            if (err) {
                return next(err);
            }

            if (errors) {
                for (let error in errors) {
                    if ((error = errors[error]).messageCode) {
                        req.flash('warning', req.__(error.messageCode, req.__(error.property), error.value));
                    }
                }
                return res.render('register/index', {user: req.body});
            }

            if (!user) {
                req.flash('warning', req.__('user.error-creating'));
                return res.render('register/index', {user: req.body});
            }

            req.flash('success', req.__('user.created'));
            res.redirect('/');
        });
    }
};