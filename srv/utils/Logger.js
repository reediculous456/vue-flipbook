import appRoot from 'app-root-path';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const fileTransport = new transports.File({
  filename: `${appRoot}/logs/app.log`,
  format: format.combine(
    format.json(),
    format.timestamp(),
  ),
  handleExceptions: true,
  level: `debug`,
  maxFiles: 5,
  maxsize: 2831155, // 5MB
});

const consoleTransport = new transports.Console({
  format: format.combine(
    format.colorize(),
    format.simple(),
    format.timestamp(),
    format.errors(),
  ),
  handleExceptions: true,
  level: `info`,
});

const rotateFileTransport = new transports.DailyRotateFile({
  auditFile: `${appRoot}/logs/audit.json`,
  datePattern: `YYYY-MM-DD-HH`,
  filename: `${appRoot}/logs/app-%DATE%.log`,
  format: format.combine(
    format.json(),
    format.timestamp(),
  ),
  level: `debug`,
  maxFiles: `14d`,
  maxSize: `5m`,
  zippedArchive: true,
});

export const logger = createLogger({
  exitOnError: false,
  transports: [
    fileTransport,
    consoleTransport,
    rotateFileTransport,
  ],
});

export const stream = {
  write(message) {
    logger.info(message.substring(0, message.lastIndexOf(`\n`)));
  },
};
