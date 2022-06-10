const config = require('../config/app')
const { createLogger, format, transports } = require('winston')
const { combine, splat, timestamp, printf, simple } = format
const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}] : ${message} `
  if (metadata) {
    msg += JSON.stringify(metadata)
  }
  return msg
})
const winston_logger = createLogger({
  level: config.LOG_LEVEL,
  format: combine(format.colorize(), simple(), timestamp(), myFormat),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: './logs/error.log', level: 'error' }),
    new transports.File({ filename: './logs/combined.log' })
  ]
})

module.exports = winston_logger
