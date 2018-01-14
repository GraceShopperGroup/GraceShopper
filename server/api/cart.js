const router = require('express').Router()
//Import Order Model from DB
module.exports = router

router.post('/', (req, res, next) => {
  let product = req.body
  if (!req.session.cart) {
    req.session.cart = {}
  }
  if (!req.session.cart[product.id]) {
    product.quantity = 1
    req.session.cart[product.id] = product;
  }
  else req.session.cart[product.id].quantity++

  res.json(req.session.cart);
})

router.get('/', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = {}
  }
  res.json(req.session.cart);
})