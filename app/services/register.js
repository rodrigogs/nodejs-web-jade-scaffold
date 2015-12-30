'use strict';

const UserSchema = require('../models/user');

module.exports = {
    
    /**
     * 
     */
    register: (user, callback) => {
        UserSchema.findOne({user_name: user.user_name}, (err, usr) => {
            if (err) {
                return callback(err);
            }

            if (usr) {
                return callback(null, 'user.exists');
            }

            user = new UserSchema(user);
            user.save((err, user) => {
                if (err) {
                    return callback(err);
                }

                callback(null, null, user);
            });
        });
    }
};