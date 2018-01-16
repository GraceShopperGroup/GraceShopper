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
    Order.create()
      .then(order => {
        let orderProducts = [];
        Object.keys(req.session.cart).forEach(prod => {
          orderProducts.push({
            orderId: order.id,
            productId: prod.id,
            quantity: prod.quantity,
            priceAtPurchase: prod.price
          })
        })
        return OrderProduct.create(orderProducts)
      })
      .then((orderProducts) => res.json(orderProducts))
      .catch(err => console.log(err))
  } else {
    res.status(404);
  }
})

module.exports = router;
