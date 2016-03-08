'use strict';

const CONFIG = require('./config.json');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const AuthService = require('../app/services/auth');
const UserSchema = require('../app/models/user');
const CryptUtils = require('../app/utils/crypt');

const _getThirdPartyInfo = (profile) => {
    if (profile.provider === 'facebook') {
        return {
            name: `${profile._json.first_name} ${profile._json.last_name}`,
            description: profile._json.about || profile._json.bio,
            image: profile._json.picture.data.url
        };
    }
    if (profile.provider === 'twitter') {
        return {
            name: profile.displayName,
            description: profile._json.description,
            image: profile._json.profile_image_url
        };
    }
    if (profile.provider === 'google') {
        const currentOrg = profile._json
            .organizations.find((org) => { return org.primary === true }) || {};

        const currentPlace = profile
            ._json.placesLived.find((pla) => { return pla.primary === true }) || {};

        return {
            name: profile.displayName,
            description: (currentOrg ? `${currentOrg.title} - ${currentOrg.name}` : currentPlace.value) || '',
            image: profile.photos[0].value
        };
    }
    if (profile.provider === 'github') {
        return {
            name: profile.displayName,
            description: ((profile._json.company || profile._json.location) || progile._json.blog) || profile._json.email,
            image: profile.photos[0].value
        };
    }
    if (profile.provider === 'linkedin') {
        return {
            name: profile.displayName,
            description: profile._json.headline,
            image: profile.photos[0].value
        }
    }
    if (profile.provider === 'instagram') {
        return {
            name: profile.displayName,
            description: profile._json.data.bio,
            image: profile._json.data.profile_picture
        }
    }
};

/*--------------- Serialization ---------------*/

passport.serializeUser((user, done) => {
    done(null, {id: user._id, info: user.info});
});

passport.deserializeUser((user, done) => {
    const info = user.info || {};
    UserSchema.findById(user.id, (err, user) => {
        if (err) {
            return done(err);
        }
        user = user.toObject();
        user.info = info;
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
        }, (err, user, info) => {
            if (err) {
                return done(err);
            }
            if (user) {
                user.info = { name: `${user.name} ${user.last_name}`};
            }
            done(null, user, info);
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
        AuthService.resolveUser({
            facebook_id: profile.id,
            email: profile._json.email,
            name: profile._json.first_name,
            last_name: profile._json.last_name
        }, (err, user, info) => {
            if (err) {
                return done(err);
            }
            if (user) {
                user.info = _getThirdPartyInfo(profile);
            }
            done(null, user, info);
        });
    }));
}

if (CONFIG.AUTH.TWITTER.ENABLED) {
    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/callback",
        includeEmail: true
    }, (accessToken, refreshToken, profile, done) => {
        AuthService.resolveUser({
            twitter_id: profile.id,
            name: profile.displayName.split(' ')[0],
            last_name: profile.displayName.split(' ').slice(1).join(' '),
            email: `${profile.id}@twitter.com` // Until there is no way to retrieve email from twitter API
        }, (err, user, info) => {
            if (err) {
                return done(err);
            }
            if (user) {
                user.info = _getThirdPartyInfo(profile);
            }
            done(null, user, info);
        });
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
        }, (err, user, info) => {
            if (err) {
                return done(err);
            }
            if (user) {
                user.info = _getThirdPartyInfo(profile);
            }
            done(null, user, info);
        });
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
        }, (err, user, info) => {
            if (err) {
                return done(err);
            }
            if (user) {
                user.info = _getThirdPartyInfo(profile);
            }
            done(null, user, info);
        });
    }));
}

if (CONFIG.AUTH.LINKEDIN.ENABLED) {
    passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_KEY,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: '/auth/linkedin/callback',
        scope: CONFIG.AUTH.LINKEDIN.OPTIONS.scope
    }, (accessToken, refreshToken, profile, done) => {
        AuthService.resolveUser({
            linkedin_id: profile.id,
            name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value
        }, (err, user, info) => {
            if (err) {
                return done(err);
            }
            if (user) {
                user.info = _getThirdPartyInfo(profile);
            }
            done(null, user, info);
        });
    }));
}

if (CONFIG.AUTH.INSTAGRAM.ENABLED) {
    passport.use(new InstagramStrategy({
        clientID: process.env.INSTAGRAM_CLIENT_ID,
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
        callbackURL: '/auth/instagram/callback'
    }, (accessToken, refreshToken, profile, done) => {
        AuthService.resolveUser({
            instagram_id: profile.id,
            name: profile.displayName.split(' ')[0],
            last_name: profile.displayName.split(' ').slice(1).join(' '),
            email: `${profile.username}@instagram.com`
        }, (err, user, info) => {
            if (err) {
                return done(err);
            }
            if (user) {
                user.info = _getThirdPartyInfo(profile);
            }
            done(null, user, info);
        });
    }));
}