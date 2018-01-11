const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll({})
    .then(categories => res.json(categories))
    .catch(next)
})

router.post('/', (req, res, next) => {
  if (req.user.isAdmin)
    Category.create(req.body)
      .then(categories => res.status(201).json(categories))
      .catch(next);
  else next(err);
})
