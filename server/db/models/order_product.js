const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order_product', {
  priceAtPurchase: {
    type: Sequelize.INTEGER,
    get() {
      return (0.01 * this.getDataValue('price')).toFixed(2);
    },
    set(val) {
      this.setDataValue('price', val * 100)
    }
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderProduct
