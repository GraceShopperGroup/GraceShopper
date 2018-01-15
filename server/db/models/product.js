const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    get() {
      return 100 * this.getDataValue('price');
    },
    set(val) {
      this.setDataValue('price', val * 100)
    }
  },
  inventoryQuant: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/crying-jordan.jpg'
  }
})

module.exports = Product
