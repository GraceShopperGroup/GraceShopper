const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const sneakerName = 'Air Force 1'
    const sneakDescription = 'OG OG OGO'
    const sneakPrice = '100.00'

    beforeEach(() => {
      return Product.create({
        name: sneakerName,
        description: sneakDescription,
        price: sneakPrice
      })
    })

    it ('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(sneakerName)
          expect(res.body[0].description).to.be.equal(sneakDescription)
          expect(res.body[0].price).to.be.equal(sneakPrice)
        })
    })
  })
})
