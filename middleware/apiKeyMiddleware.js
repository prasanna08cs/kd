const config = require('../config/app')
const apiKeys = [config.API_KEY]
module.exports = (req, res, next) => {
  if (
    !req.headers ||
    !req.headers['x-api-key'] ||
    !apiKeys.includes(req.headers['x-api-key'])
  ) {
    return res
      .status(403)
      .send({ code: 4, message: 'Please send valid api key' })
  }
  next()
}
