'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const CryptUtils = require('../utils/crypt');
const validator = require('validator');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    email: {
        type: String,
        index: { unique: true },
        required: true,
        validate: [validator.isEmail, 'user.invalidemail']
    },
    user_name: {
        type: String,
        index: { unique: true },
        required: true
    },
    password: {
        type: String
    },
    facebook_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    twitter_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    google_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    github_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    linkedin_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    instagram_id: {
        type: String,
        index: {
            unique: true,
            sparse: true
        }
    },
    creation_date: {
        type: Date,
        default: new Date()
    }
});

UserSchema.post('validate', doc => {
    if (doc.isModified('password')) {
        doc.password = CryptUtils.encrypt(doc.password);
    }

    if (!doc._id) {
        doc.creation_date = Date.now();
    }
});

UserSchema.plugin(uniqueValidator, { message: 'mongoose.unique-error' });

module.exports = mongoose.model('User', UserSchema);