const winston = require('winston');

const timeStamp = new Date().toString().split(' GMT')[0];

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), 
                winston.format.printf((log) => {
                    return `${timeStamp} ${log.level}: ${log.function}: ${log.message}`;
                })
            )
        })
    ]
});

module.exports = logger;