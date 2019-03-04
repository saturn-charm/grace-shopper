const Sequelize = require('sequelize')
const db = require('../db')

const ItemInOrder = db.define('item-in-order', {
  numberOfItems: {
    type: Sequelize.SMALLINT
  },
  purchaseTotal: {
    type: Sequelize.SMALLINT
  }
})

module.exports = ItemInOrder
