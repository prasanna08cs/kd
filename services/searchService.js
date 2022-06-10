const log = require('../config/log')
const data = require('../mock_data.json')
const string_helper = require('../helpers/stringHelper')
module.exports.get = async queryString => {
  try {
    const perPageRecords = 25
    let sortKey = queryString.sortKey || 'name',
      max = perPageRecords,
      min = 0
    pageNumber = parseInt(queryString.pageNumber) || 1
    if (pageNumber <= 0) {
      pageNumber = 1
    }
    if (!['name', 'dateLastEdited'].includes(sortKey)) {
      sortKey = 'name'
    }

    let searchQuery = queryString.query
      ? queryString.query.toLocaleLowerCase()
      : ''
    let excatMatch = searchQuery.match(/"/gi || [])
    let myReg = new RegExp('.*' + searchQuery + '.*', 'gi')
    if (excatMatch) {
      searchQuery = searchQuery.replace(/"/g, '')
      myReg = new RegExp('^' + searchQuery + '$', 'gi')
    }
    let result = data
    if (searchQuery) {
      result = data.filter(function (element) {
        let name = element.name.toLocaleLowerCase(),
          description = element.description.toLocaleLowerCase()
        if (name.match(myReg) || description.match(myReg)) {
          return true
        }
      })
    }
    if (pageNumber > 1) {
      max = perPageRecords * pageNumber
      min = perPageRecords * (pageNumber - 1)
    }
    let counter = 1

    const result_final = result
      .filter(function () {
        if (counter > min && counter <= max) {
          counter++
          return true
        }
        counter++
      })
      .sort(string_helper.sortCallBack(sortKey))
    return {
      code: 0,
      sortKey: sortKey,
      pageNumber: pageNumber,
      total: result.length,
      message: 'success',
      records: result_final
    }
  } catch (err) {
    log.error(err)
    return {
      code: 1,
      message: 'Unable to get the post,try after sometime',
      records: []
    }
  }
}
