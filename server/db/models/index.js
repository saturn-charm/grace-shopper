const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const ItemInOrder = require('./item_in_order')

// Associations
Product.belongsToMany(Order, {through: ItemInOrder})
Order.belongsToMany(Product, {through: ItemInOrder})
User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Product,
  Order,
  ItemInOrder
}
