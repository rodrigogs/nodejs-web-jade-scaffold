'use strict';

const CONFIG = require('../../config/config.json');
const passport = require('passport');

const OPTIONS = {
    badRequestMessage: 'passport.badrequest', // 18n reference
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
};

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
    login: passport.authenticate('local', OPTIONS),

    /**
     * Facebook action
     */
    facebook: passport.authenticate('facebook', CONFIG.AUTH.FACEBOOK.OPTIONS),

    /**
     * FacebookCallback action
     */
    facebookCallback: passport.authenticate('facebook', OPTIONS),

    /**
     * Twitter action
     */
    twitter: passport.authenticate('twitter'),

    /**
     * TwitterCallback action
     */
    twitterCallback: passport.authenticate('twitter', OPTIONS),

    /**
     * Github action
     */
    google: passport.authenticate('google', CONFIG.AUTH.GOOGLE.OPTIONS),

    /**
     * GithubCallback action
     */
    googleCallback: passport.authenticate('google', OPTIONS),

    /**
     * Github action
     */
    github: passport.authenticate('github'),

    /**
     * GithubCallback action
     */
    githubCallback: passport.authenticate('github', OPTIONS),

    /**
     * Logout action
     */
    logout: (req, res, next) => {
        req.logout();
        res.redirect('/');
    }
};