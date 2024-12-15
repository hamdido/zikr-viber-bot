const winston = require('winston');
const { combine, timestamp, printf, colorize, align } = winston.format;

function createLogger() {
    const options = {
        console: {
          level: process.env.LOG_LEVEL || 'info',
          format: combine(
            colorize({ all: true }),
            timestamp({
              format: 'YYYY-MM-DD hh:mm:ss.SSS A',
            }),
            align(),
            printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
          )
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