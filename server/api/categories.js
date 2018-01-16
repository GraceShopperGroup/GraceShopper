const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll({include: [{all: true}]})
    .then(categories => res.json(categories))
    .catch(next)
})
