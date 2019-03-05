const router = require('express').Router()
const {Order, ItemInOrder, Product} = require('../db/models')

//api/orders
router.get('/', async (req, res, next) => {
  try {
    if (req.session.passport) {
      const response = await Order.findOrCreate({
        //what if a user has multiple un-purchased orders?
        where: {userId: req.session.passport.user},
        include: [{model: Product}]
      })
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

//api/orders/:orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    //the point of this route is to get the quantity of items in an order
    const orderItems = await ItemInOrder.findAll({
      //example: eager loading from above route tells you that you have
      where: {
        //dog sneakers in your cart, but not how many. this route returns ItemInOrder, which
        orderId: req.params.orderId //includes quantity and historical price information
      }
    })
    res.json(orderItems)
  } catch (error) {
    next(error)
  }
})

//api/orders/newItem
router.post('/newItem', async (req, res, next) => {
  try {
    const orderItem = await ItemInOrder.find({
      where: {
        productId: req.body[0].id,
        orderId: req.body[1]
      }
    })
    if (!orderItem) {
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
