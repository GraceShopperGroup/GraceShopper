const router = require('express').Router();
const { User } = require('../db/models');

router.get('/', (req, res, next) => {
  if (req.user && req.user.id) {
    User.findById(req.user.id)
      .then(user => user.getOrders())
      .then(orders => res.json(orders))
      .catch(next)
  } else {
    res.status(404);
  }
})
