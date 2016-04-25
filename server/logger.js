var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            name: 'console-error',
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true
        }),
        new winston.transports.File({
            name: 'error-file',
            level: 'error',
            filename: './logs/jeco-board-game-error.log',
            handleExceptions: true,
            json: true,
            maxsize: 1000000,
            maxFiles: 2,
            colorize: false
        }),
        new winston.transports.File({
            name: 'debug-file',
            level: 'debug',
            filename: './logs/jeco-board-game-debug.log',
            handleExceptions: true,
            json: true,
            maxsize: 2000000,
            maxFiles: 2,
            colorize: false
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};