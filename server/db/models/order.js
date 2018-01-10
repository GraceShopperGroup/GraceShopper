const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  products: {
    type: Sequelize.STRING,
    get: function () {
      return JSON.parse(this.getDataValue('products'));
    },
    set: function (val) {
      return this.setDataValue('products', JSON.stringify(val));
    }
  }
})

module.exports = Order