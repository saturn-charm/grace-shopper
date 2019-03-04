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
    //console.log("response from findorcreate in get route for order: ", response[0])
    res.json(response[0])
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const orderItem = await ItemInOrder.create(req.body)
    res.json(orderItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router

