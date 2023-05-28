import winston from 'winston'
import 'express-async-errors'

const logFileFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DDTHH:mm:ss.SSS',
  }),
  winston.format.printf(
    info =>
      `{"message": "${info.message}", "level": "${info.level}", "service": "${info.service}", "timestamp": "${info.timestamp}Z"}`,
  ),
)

const consoleFormat = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: '[LOGGER]',
  }),
  // 2023-05-27T20:06:11.760Z
  winston.format.timestamp({
    format: 'YYYY-MM-DDTHH:mm:ss.SSS',
  }),
  winston.format.printf(
    info =>
      `- ${info.label} ${info.timestamp}Z | ${info.level} : ${info.message}`,
  ),
)

export const logger = (() => {
  const winstonLog = winston.createLogger({
    level: 'debug',
    defaultMeta: { service: 'user-service' },
    transports: [
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `logFile.log`
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        format: logFileFormat,
      }),
      new winston.transports.File({
        filename: 'logFile.log',
        format: logFileFormat,
      }),
    ],
  })

  if (process.env.NODE_ENV !== 'production') {
    winstonLog.add(
      new winston.transports.Console({
        format: consoleFormat,
      }),
    )
  }

  return winstonLog
})()
