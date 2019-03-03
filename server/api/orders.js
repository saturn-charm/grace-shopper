const router = require('express').Router()
const {Order, ItemInOrder} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    console.log(
      'req.session.passport.user in order get route: ',
      req.session.passport.user
    )
    const response = await Order.findOrCreate({
      where: {userId: req.session.passport.user}
    })
    console.log(
      'response from findorcreate in get route for order: ',
      response[1]
    )
    res.json(response[0])
  } catch (err) {
    next(err)
  }
})

router.post('/newItem', async (req, res, next) => {
  try {
    console.log('req.body[0] in post request for new item: ', req.body[0])
    console.log('req.body[1] in post request for new item: ', req.body[1])
    console.log('typeof price', typeof Number(req.body[0].price))
    const orderItem = await ItemInOrder.create({
      productId: req.body[0].id,
      orderId: req.body[1],
      purchaseTotal: req.body[0].price,
      numberOfItems: 1
    }) //price here is a string for some reason
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
