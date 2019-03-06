const router = require('express').Router()
const {ItemInOrder} = require('../db/models')
const Sequelize = require('Sequelize')

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

// api/itemInOrder/4
router.put('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const productId = req.body.productId
    const product = await ItemInOrder.find({
      where: {
        [Sequelize.Op.and]: {
          orderId: orderId,
          productId: productId
        }
      }
    })
    const updated = await product.update({
      numberOfItems: req.body.numberOfItems
    })
    console.log('-----------------------product.data: ', orderId, updated)
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    const del = ItemInOrder.destroy({
      where: {
        id: req.params.orderId
      }
    })
    res.status(200).json(del)
  } catch (error) {
    next(error)
  }
})

module.exports = router
