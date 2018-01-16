const router = require('express').Router();
const { User, Product, Order, OrderProduct } = require('../db/models');

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

router.post('/', (req, res, next) => {
  if (req.user && req.user.id && req.session.cart) {
    Order.create({
      where: {
        userId: req.user.id
      }
    })
      .then(order => {
        Object.keys(req.session.cart).forEach(prod => {
          order.addProduct(req.session.cart[prod].id)
            .then(orderProd => {
              orderProd[0][0].update({
                priceAtPurchase: req.session.cart[prod].price,
                quantity: req.session.cart[prod].quantity
              })
            })
        })
        res.json(order);
      })
      .catch(next)
  } else {
    res.status(404);
  }
})

module.exports = router;
