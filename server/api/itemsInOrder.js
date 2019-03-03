const router = require('express').Router()
const {ItemInOrder} = require('../db/models')

// api/itemsInOrder/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const response = await ItemInOrder.findById(productId)
    res.json(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
