'use strict';

const IndexService = require('../services/index');

module.exports = {
    
    /**
     * Index action
     */
    index: (req, res, next) => {
        let message = IndexService.getMessage();
        
        res.render('index', {message: message});
    }
};