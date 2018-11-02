const { createLogger, format, transports } = require('winston');

module.exports = () => {
    const logger = createLogger({
        level: 'info',
        format: format.json()
    });

    logger.add(new transports.Console({
        format: format.simple(),
        handleExceptions: true,
        transports: [new transports.Console()]
    }));

    return logger;
};