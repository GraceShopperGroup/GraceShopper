const Sequelize = require('sequelize')
const db = require('../db')

// OB/DK: many<->many relationship, consider a custom join table, order_products (this would keep the foreign key relationships "first class")
/*
const Order = db.define('order', ...);
const Product = db.define('product', ...);
const OrderProduct = db.define('order_product', {
  priceAtPurchaseTime: Sequelize.DECIMAL,
  quantity: Sequelize.INTEGER
});
Order.belongsToMany(Product, {through: OrderProduct});
*/
const Order = db.define('order', {
  
})

module.exports = Order