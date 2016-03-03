'use strict';

const CONFIG = require('./config.json');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const AuthService = require('../app/services/auth');
const UserSchema = require('../app/models/user');
const CryptUtils = require('../app/utils/crypt');

/*--------------- Serialization ---------------*/

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    UserSchema.findById(id, (err, user) => {
        done(err, user);
    });
});

/*----------------- Strategies -----------------*/

if (CONFIG.AUTH.LOCAL.ENABLED) {
    passport.use(new LocalStrategy((username, password, done) => {
        AuthService.resolveUser({
            user_name: username,
            password: CryptUtils.encrypt(password),
            isLocal: true
        }, done);
    }));
}

if (CONFIG.AUTH.FACEBOOK.ENABLED) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/auth/facebook/callback',
        profileFields: CONFIG.AUTH.FACEBOOK.PROFILE_FIELDS
    }, (accessToken, refreshToken, profile, done) => {
        AuthService.resolveUser({
            facebook_id: profile.id,
            email: profile._json.email,
            name: profile._json.first_name,
            last_name: profile._json.last_name
        }, done);
    }));
}

if (CONFIG.AUTH.TWITTER.ENABLED) {
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        includeEmail: true
    }, (accessToken, refreshToken, profile, done) => {
        AuthService.resolveUser({
            twitter_id: profile.id,
            name: profile.displayName.split(' ')[0],
            last_name: profile.displayName.split(' ').slice(1).join(' '),
            email: profile.id + '@twitter.com' // Until there is no way to retrieve email from twitter API
        }, done);
    }));
}

if (CONFIG.AUTH.GOOGLE.ENABLED) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        // Dont forget to enable Google+ API in Developer Console in order to get user's information
        AuthService.resolveUser({
            google_id: profile.id,
            name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value
        }, done);
    }));
}

if (CONFIG.AUTH.GITHUB.ENABLED) {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback'
    }, (accessToken, refreshToken, profile, done) => {
        AuthService.resolveUser({
            github_id: profile.id,
            name: profile.displayName.split(' ')[0],
            last_name: profile.displayName.split(' ').slice(1).join(' '),
            email: profile.emails[0].value
        }, done);
    }));
}
