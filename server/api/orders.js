const router = require('express').Router()
const {Order, ItemInOrder, Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    if (req.session.passport) {
      const response = await Order.findOrCreate({
        where: {userId: req.session.passport.user},
        include: [{model: Product}]
      })
      console.log(
        'response from findorcreate in get route for order: ',
        response[1]
      )
      res.json(response[0])
    } else {
      console.log('no user on session')
      const guestOrder = await Order.create({})
      res.json(guestOrder)
    }
  } catch (err) {
    next(err)
  }
})

//api/itemsInOrder/:orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    console.log('GETTIBG ITEMS from ORDER ')
    const orderItems = await ItemInOrder.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    res.json(orderItems)
  } catch (error) {
    next(error)
  }
})

router.post('/newItem', async (req, res, next) => {
  try {
    const orderItems = await ItemInOrder.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    res.json(orderItems)
  } catch (error) {
    next(error)
  }
})

router.post('/newItem', async (req, res, next) => {
  try {
    const orderItem = await ItemInOrder.find({
      where: {
        productId: req.body[0].id,
        orderId: req.body[1]
      }
    })
    if (!orderItem) {
      console.log(
        "~~~~~~~~~~~~~~~~didn't find exisitng orderitem, making new one~~~~~~~~~~~~~~~~~~~",
        req.body
      )
      const newOrderItem = await ItemInOrder.create({
        productId: req.body[0].id,
        orderId: req.body[1],
        numberOfItems: 1,
        purchaseTotal: req.body[0].price
      })
      res.json(newOrderItem)
    } else {
      res.json(orderItem)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
