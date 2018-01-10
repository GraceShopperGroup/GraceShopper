const Sequelize = require('sequelize')
const db = require('../db')

// OB/DK: consider adding star rating as integer
const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      len: [50, 500]
    }
  }
})

module.exports = Review