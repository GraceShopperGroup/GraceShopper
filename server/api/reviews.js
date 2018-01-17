const router = require('express').Router();
const { Review } = require('../db/models');
module.exports = router

router.get('/', (req, res, next) => {
  Review.findAll({include: [{all: true}]})
  .then(reviews => res.json(reviews))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next)
})
