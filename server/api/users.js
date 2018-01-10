const router = require('express').Router()
const { User, Order } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status.json(user))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  if (req.user && req.user.id === req.params.id)
    User.findById(req.params.id, { include: [Order] })
      .then(user => res.json(user))
      .catch(next);
  else next(err);
});


