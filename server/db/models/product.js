const Sequelize = require('sequelize')
const db = require('../db')

// OB/DK: consider validations (not urgent)
const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  // OB/DK: consider storing as an INTEGER (to help with rounding errors)
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

// OB/DK: consider making a product.getAverageRating instance method

module.exports = Product