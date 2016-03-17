'use strict';

const crypto = require('crypto');

module.exports = {

    /**
     * 
     */
    encrypt: value => {
        let cipher = crypto.createCipher('aes-256-ctr', 'my-key');
        let crypted = cipher.update(value, 'utf8', 'hex');
        crypted += cipher.final('hex');
        
        return crypted;
    }
};