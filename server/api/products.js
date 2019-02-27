const router = require('express').Router()
const {Product} = require('../db/models')

// /products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'imageUrl', 'price']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

module.exports = router
