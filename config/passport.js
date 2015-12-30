'use strict';

const CONFIG = require('./config.json');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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
            clientID: CONFIG.AUTH.FACEBOOK.APP_ID,
            clientSecret: CONFIG.AUTH.FACEBOOK.APP_SECRET,
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'first_name', 'last_name']
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
                    last_name: profile._json.last_name
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