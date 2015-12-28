'use strict';

const router = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserSchema = require('../app/models/user');
const CryptUtils = require('../app/utils/crypt');

module.exports = (app) => {

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        UserSchema.findById(id, (err, user) => {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy((username, password, done) => {
        UserSchema.findOne({ user_name: username, password: CryptUtils.encrypt(password) }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            return done(null, user);
        });
    }));

    router
        .get('/login', (req, res, next) => {
            res.render('auth/login');
        })
        .post('/login', (req, res, next) => {
            passport.authenticate('local', (err, user) => {
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
            })(req, res, next);
        })
        .get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });

    app.use(router);
};