const router = require('express').Router()
const {Product} = require('../db/models')

// api/products
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

// api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const product = await Product.findById(productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

//api/products/:productId
router.put('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const order = await Product.findById(productId)
    if (!order) res.sendStatus(404)
    const updated = await order.update({
      stock: req.body.stock
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

module.exports = router
