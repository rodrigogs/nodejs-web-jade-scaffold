'use strict';

const CONFIG = require('../../config/config.json');
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
                return res.redirect('/auth/login');
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
        AuthService.authenticate('facebook', CONFIG.AUTH.FACEBOOK.OPTIONS)(req, res, next);
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
     * Twitter action
     */
    twitter: (req, res, next) => {
        AuthService.authenticate('twitter')(req, res, next);
    },

    /**
     * TwitterCallback action
     */
    twitterCallback: (req, res, next) => {
        AuthService.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/auth/login'
        })(req, res, next);
    },

    /**
     * Github action
     */
    google: (req, res, next) => {
        AuthService.authenticate('google', CONFIG.AUTH.GOOGLE.OPTIONS)(req, res, next);
    },

    /**
     * GithubCallback action
     */
    googleCallback: (req, res, next) => {
        AuthService.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/auth/login'
        })(req, res, next);
    },

    /**
     * Github action
     */
    github: (req, res, next) => {
        AuthService.authenticate('github')(req, res, next);
    },

    /**
     * GithubCallback action
     */
    githubCallback: (req, res, next) => {
        AuthService.authenticate('github', {
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