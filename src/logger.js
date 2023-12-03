const winston = require('winston');
const toYAML = require('winston-console-formatter');

function createLogger() {
    const options = {
        console: {
        level: process.env.LOG_LEVEL || 'info',
        handleExceptions: true,
        json: false,
        format: winston.format.simple(),
        colorize: true,
      }
    }
    const logger = winston.createLogger({
      transports: [
        new (winston.transports.Console)(options.console)
      ]
    });

    return logger;
}

const logger = createLogger();

module.exports = logger