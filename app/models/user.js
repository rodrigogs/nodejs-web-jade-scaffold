'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CryptUtils = require('../utils/crypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
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
        index: { unique: true }
    },
    twitter_id: {
        type: String,
        index: { unique: true }
    },
    google_id: {
        type: String,
        index: { unique: true }
    },
    github_id: {
        type: String,
        index: { unique: true }
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

module.exports = mongoose.model('User', UserSchema);