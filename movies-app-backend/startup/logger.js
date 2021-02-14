const winston = require('winston');
const config = require('config');
require('winston-mongodb');
require('express-async-errors');

module.exports = function(params) {
    winston.add(new winston.transports.File({
        filename: 'logfile.log',
        handleExceptions: true})); 
        
    winston.add(new winston.transports.MongoDB({db: config.get('db'), level: 'info'}));
}

// new winston.transports.Console({colorize: true , prettyPrint: true})