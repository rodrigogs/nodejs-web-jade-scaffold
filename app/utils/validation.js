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
    extractErrors: (error) => {
        const errors = [];

        if (!error.errors) {
            return {};
        }

        const validationErrors = filerObject(error.errors, err => {
            return err.name === 'ValidatorError';
        });
        
        console.log(validationErrors);

        for (let err in validationErrors) {
            errors.push({
                messageCode: err.message,
                property: err.path,
                value: err.value
            });
        }

        return errors;
    }
};