const searchService = require('../services/searchService')

module.exports.get = async (req, res) => {
  let result = await searchService.get(req.query)
  if (result.code == 0) {
    return res.send(result)
  } else {
    return res.status(400).send(result)
  }
}
