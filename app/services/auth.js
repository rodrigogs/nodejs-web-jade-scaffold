'use strict';

const validator = require('validator');
const UserSchema = require('../models/user');

/**
 * 
 */
const _getQuery = (info) => {
    const query = {$or: []};
    if (info.user_name) {
        query.$or.push({
            user_name: info.user_name,
            password: info.password
        });
    }
    if (info.email) query.$or.push({email: info.email});
    if (info.facebook_id) query.$or.push({facebook_id: info.facebook_id});
    if (info.twitter_id) query.$or.push({twitter_id: info.twitter_id});
    if (info.google_id) query.$or.push({google_id: info.google_id});
    if (info.github_id) query.$or.push({github_id: info.github_id});

    return query;
};

/**
 * 
 */
const _resolveLocal = (user, callback) => {
    if (!user) {
        return callback(null, false, {type: 'danger', message: 'auth.failed'});
    }

    return callback(null, user);
};

/**
 * 
 */
const _updateUser = (user, info, callback) => {
    user.facebook_id = info.facebook_id || user.facebook_id;
    user.twitter_id = info.twitter_id || user.twitter_id;
    user.google_id = info.google_id || user.google_id;
    user.github_id = info.github_id || user.github_id;

    user.save((err, user) => {
        if (err) {
            return callback(err);
        }

        return callback(null, user);
    });
};

/**
 * 
 */
const _createUser = (info, callback) => {
    if (!info.user_name && info.email && validator.isEmail(info.email)) {
        info.user_name = info.email.split('@')[0];
    }

    let user = new UserSchema(info);

    user.save((err, user) => {
        if (err) {
            return callback(err);
        }

        callback(null, user);
    });
};

module.exports = {

    /**
     * ResolveUser
     */
    resolveUser: (userInfo, callback) => {
        const isLocal = userInfo.isLocal;
        delete userInfo.isLocal;

        UserSchema.findOne(_getQuery(userInfo), (err, user) => {
            if (err) {
                return callback(err);
            }

            if (isLocal) {
                return _resolveLocal(user, callback);
            }

            if (user) {
                return _updateUser(user, userInfo, callback);
            }

            return _createUser(userInfo, callback);
        });
    }
};