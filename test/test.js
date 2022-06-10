const app = require('../main')
const chai = require('chai')
const chaiHttp = require('chai-http')
const API_VERSION = '/search'
const { expect } = chai
chai.use(chaiHttp)
var API_KEY = process.env.API_KEY
describe('API TESTING!', () => {
  it('Search API- API KEY MISSING', done => {
    chai
      .request(app)
      .get(API_VERSION)
      .end((err, res) => {
        expect(res).to.have.status(403)
        done()
      })
  })
  it('Search API-  error', done => {
    chai
      .request(app)
      .get(API_VERSION + '1')
      .set('x-api-key', API_KEY)
      .end((err, res) => {
        expect(res).to.have.status(404)
        done()
      })
  })
  it('Search API- success', done => {
    chai
      .request(app)
      .get(API_VERSION)
      .set('x-api-key', API_KEY)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })
})
