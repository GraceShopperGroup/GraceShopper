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
    allowNull: false
  },
  invenQuant: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  category: {
    type: Sequelize.STRING
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/crying-jordan.jpg',
    validate: {
      isUrl: true
    }
  }
})

module.exports = Product
