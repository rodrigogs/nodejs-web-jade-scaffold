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
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
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