'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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