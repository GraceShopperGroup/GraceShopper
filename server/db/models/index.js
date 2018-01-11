const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Review = require('./review')
const OrderProduct = require('./order_product')
const Category = require('./category')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Order.belongsTo(User)
User.hasMany(Order)

Review.belongsTo(User)
User.hasMany(Review)

Review.belongsTo(Product)
Product.hasMany(Review)

Order.belongsToMany(Product, { through: OrderProduct })
Product.belongsToMany(Order, { through: OrderProduct })

Category.hasMany(Product, { as: 'ProductCategory' })
Product.belongsToMany(Category, { as: 'ProductCategory' })

module.exports = {
  User,
  Product,
  Order,
  Review,
  OrderProduct,
  Category
}
