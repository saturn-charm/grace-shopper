const router = require('express').Router()
const {Product} = require('../db/models')

// /products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'imageUrl', 'price', 'description']
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// product details
router.get('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const product = await Product.findById(productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

module.exports = router
