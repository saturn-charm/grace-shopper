const router = require('express').Router()
const {Order, ItemInOrder, Product} = require('../db/models')

// api/orders
router.get('/', async (req, res, next) => {
  try {
    if (req.session.passport) {
      // console.log('req.session.passport', req.session)
      const response = await Order.findOrCreate({
        //what if a user has multiple un-purchased orders?
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

// /api/orders
router.put('/', async (req, res, next) => {
  try {
    await Order.update(
      {
        purchased: true
      },
      {
        where: {id: req.body.id},
        returning: true, // needed for affectedRows to be populated
        plain: true // returned instances are just plain objects
      }
    )
    console.log('REQ.BODY!!!!!!!!!!!!!!!!!', req.body)
    res.send('Success')
  } catch (error) {
    next(error)
  }
})

//the point of this route is to get the quantity of items in an order
//example: eager loading from above route tells you that you have
//dog sneakers in your cart, but not how many. this route returns ItemInOrder, which
// api/orders/:orderId
//includes quantity and historical price information
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

// api/orders/newItem
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
