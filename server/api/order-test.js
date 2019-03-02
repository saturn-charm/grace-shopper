const router = require('express').Router()
const {ItemInOrder, Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ['purchased', 'userId']
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/incart', async (req, res, next) => {
  const {numberOfItems, productId} = req.body

  const orderItem = await ItemInOrder.findOne({
    where: {productId: productId, orderId: req.cart.id}
  })

  await orderItem.update({quantity: numberOfItems})
  req.cart = await Order.findById(req.cart.id)
  res.json(req.cart)
})

module.exports = router
