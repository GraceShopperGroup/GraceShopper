const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_product', {
  priceAtPurchase: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderProduct
