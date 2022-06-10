const promiseRouter = require('express-promise-router')
const router = promiseRouter()
const searchController = require('../controllers/searchController')
router.get('/', function (res, res) {
  res.send('Welcome to the app')
})
router.get('/search', searchController.get)

module.exports = router
