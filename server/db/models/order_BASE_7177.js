const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
<<<<<<<<< Temporary merge branch 1
  
=========
  products: {
    type: Sequelize.STRING,
    get: function () {
      return JSON.parse(this.getDataValue('products'));
    },
    set: function (val) {
      return this.setDataValue('products', JSON.stringify(val));
    }
  }
>>>>>>>>> Temporary merge branch 2
})

module.exports = Order