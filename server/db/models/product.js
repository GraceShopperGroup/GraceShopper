const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL
  },
  invenQuant: {
    type: Sequelize.INTEGER
  },
  category: {
    type: Sequelize.STRING
  },
  imgUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
})