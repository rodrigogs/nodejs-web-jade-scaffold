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
                console.log(errors);
                for (let error in errors) {
                    error = errors[error];
                    console.log(error.messageCode);
                    console.log(req.__(error.messageCode, error.property, error.value));
                    req.flash('warning', req.__(error.messageCode, error.property, error.value));
                }
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