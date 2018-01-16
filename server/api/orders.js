const router = require('express').Router();
const { User, Product } = require('../db/models');

router.get('/', (req, res, next) => {
  if (req.user && req.user.id) {
    User.findById(req.user.id)
      .then(user => user.getOrders({
        include: [{ model: Product }]
      }))
      .then(orders => res.json(orders))
      .catch(next)
  } else {
    res.status(404);
  }
})

module.exports = router;
