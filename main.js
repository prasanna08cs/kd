require('dotenv').config()

const express = require('express')
var morgan = require('morgan')
const app = express()
const config = require('./config/app')
const log = require('./config/log')
const routes = require('./routes/index')
const apiKeyMiddleware = require('./middleware/apiKeyMiddleware')

app.use(express.json())
app.use(morgan('short'))
app.use(apiKeyMiddleware)
app.use(routes)

app.disable('x-powered-by')

app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  error.code = 2
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    code: error.code || 3,
    message: error.message || 'Internal Server Error'
  })
})

app.listen(config.PORT, () => {
  log.info(`Example app listening on port ${config.PORT}`)
  console.log('Server running at ', config.PORT)
})

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p)
    log.error('Unhandled Rejection at Promise' + reason)
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown')
    log.error('Uncaught Exception thrown' + JSON.stringify(err))
    process.exit(1)
  })

module.exports = app
