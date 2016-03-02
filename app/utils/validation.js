'use strict';

const filerObject = require('filter-object');

module.exports = {

    /**
     * 
     */
    hasValidationErrors: error => {
        if (!error.errors) {
            return false;
        }

        return !!filerObject(error.errors, err => {
            return err.name === 'ValidatorError';
        });
    },

    /**
     * 
     */
    extractErrors: (error, i18nAlias) => {
        const errors = [];

        if (!error.errors) {
            return [];
        }

        const validationErrors = filerObject(error.errors, err => {
            return err.name === 'ValidatorError';
        });

        for (let err in validationErrors) {
            err = validationErrors[err];
            errors.push({
                messageCode: err.message,
                property: i18nAlias ? `${i18nAlias}.${err.path}` : err.path,
                value: err.value
            });
        }

        return errors;
    }
};