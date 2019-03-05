const router = require('express').Router()
const {Order, ItemInOrder, Product} = require('../db/models')

router.get('/myCart', async (req, res, next) => {
  try {
    if (req.session.passport) {
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
      //console.log('no user on session, sending back a guest cart')
      if (!req.session.guestCart) {
        req.session.guestCart = {}
      }
      if (!req.session.itemsInOrder) {
        req.session.itemsInOrder = []
      }
      //console.log('heres req.session before sending back the guest cart: ', req.session)
      res.json(req.session)
    }
  } catch (err) {
    next(err)
  }
})

//api/orders/:orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    if (req.session.passport) {
      console.log('GETTING ITEMS from ORDER ') //the point of this route is to get the quantity of items in an order
      const orderItems = await ItemInOrder.findAll({
        //example: eager loading from above route tells you that you have
        where: {
          //dog sneakers in your cart, but not how many. this route returns ItemInOrder, which
          orderId: req.params.orderId //includes quantity and historical price information
        }
      })
      res.json(orderItems)
    }
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
