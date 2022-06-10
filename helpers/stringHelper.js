sortCallBack = sortKey => {
  return function (object1, object2) {
    return object1[sortKey].localeCompare(object2[sortKey])
  }
}
module.exports = {
  sortCallBack
}
