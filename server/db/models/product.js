const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://thumbs.dreamstime.com/z/dog-s-shoe-tripping-untied-35441924.jpg',
    validate: {
      isUrl: true
    }
  },
  stock: {
    type: Sequelize.SMALLINT,
    validate: {
      min: 0
    },
    defaultValue: 1
  },
  price: {
    type: Sequelize.SMALLINT,
    validate: {
      min: 0
    },
    allowNull: false
  }
})

module.exports = Product
