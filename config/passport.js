'use strict';

const CONFIG = require('./config.json');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
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
}

if (CONFIG.AUTH.FACEBOOK.ENABLED) {
    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: '/auth/facebook/callback',
            profileFields: CONFIG.AUTH.FACEBOOK.PROFILE_FIELDS
        }, (accessToken, refreshToken, profile, done) => {

            UserSchema.findOne({facebook_id: profile.id}, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                }
                
                user = new UserSchema({
                    facebook_id: profile.id,
                    name: profile._json.first_name,
                    last_name: profile._json.last_name,
                    user_name: profile._json.email
                });

                user.save(user, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    done(null, user);
                });
            });
        }
    ));
}

if (CONFIG.AUTH.TWITTER.ENABLED) {
    passport.use(new TwitterStrategy({
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET
        }, (accessToken, refreshToken, profile, done) => {

            UserSchema.findOne({twitter_id: profile.id}, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                }

                user = new UserSchema({
                    twitter_id: profile.id,
                    name: profile.displayName.split(' ')[0],
                    last_name: profile.displayName.split(' ').slice(1).join(' '),
                    user_name: profile.username
                });

                user.save(user, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    done(null, user);
                });
            });
        }
    ));
}

if (CONFIG.AUTH.GITHUB.ENABLED) {
    passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: '/auth/github/callback'
        }, (accessToken, refreshToken, profile, done) => {

            UserSchema.findOne({github_id: profile.id}, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                }

                user = new UserSchema({
                    github_id: profile.id,
                    name: profile.displayName.split(' ')[0],
                    last_name: profile.displayName.split(' ').slice(1).join(' '),
                    user_name: profile.username
                });

                user.save(user, (err, user) => {
                    if (err) {
                        return done(err);
                    }
                    done(null, user);
                });
            });
        }
    ));
}