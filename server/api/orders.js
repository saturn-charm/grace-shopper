const router = require('express').Router()
const {Order, ItemInOrder} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    // console.log(
    //   'req.session.passport.user in order get route: ',
    //   req.session.passport.user
    // )
    if (req.session.passport) {
      const response = await Order.findOrCreate({
        where: {userId: req.session.passport.user}
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

//api/itemsInOrder/
router.get('/:orderId', async (req, res, next) => {
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
    console.log('req.body[0] in post request for new item: ', req.body[0])
    console.log('req.body[1] in post request for new item: ', req.body[1])
    console.log('id', req.body[0].id)
    const orderItem = await ItemInOrder.find({
      where: {
        productId: req.body[0].id,
        orderId: req.body[1]
        // purchaseTotal: req.body[0].price,
        //numberOfItems: 1
      }
    })
    if (!orderItem) {
      console.log(
        "~~~~~~~~~~~~~~~~didn't find exisitng orderitem, making new one~~~~~~~~~~~~~~~~~~~"
      )
      const newOrderItem = await ItemInOrder.create({
        productId: req.body[0].id,
        orderId: req.body[1],
        numberOfItems: 1,
        purchaseTotal: req.body[0].price
      })
      res.json(newOrderItem.data)
    } else {
      res.json(orderItem.data)
    }
    //console.log("orderitem: ", orderItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
