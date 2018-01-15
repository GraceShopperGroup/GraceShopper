const router = require('express').Router();
const { User } = require('../db/models');

router.get('/', (req, res, next) => {
  //console.log(req);
  if (req.user && req.user.id) {
    console.log('true')
    User.findById(req.user.id)
      .then(user => user.getOrders())
      .then(orders => res.json(orders))
      .catch(next)
  } else {
    console.log('false')
    res.status(404);
  }
})

module.exports = router;
