import appRootPath from 'app-root-path';
import winston  from 'winston';

const logOptions = {
  file: {
    level: 'info',
    filename: `${appRootPath}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'error',
    handleExceptions: true,
    json: true,
    colorize: true,
  },
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(logOptions.file),
    new winston.transports.Console(logOptions.console),
  ],
  exitOnError: false,
});

export { logger };