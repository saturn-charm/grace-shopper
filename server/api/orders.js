const router = require('express').Router()
const {Order, ItemInOrder, Product} = require('../db/models')

//api/orders/myCart
router.get('/myCart', async (req, res, next) => {
  try {
    if (req.session.passport) {
      const response = await Order.findOrCreate({
        //what if a user has multiple un-purchased orders?
        where: {userId: req.session.passport.user, purchased: false},
        include: [{model: Product}]
      })
      res.json(response[0])
    } else {
      if (!req.session.guestCart) {
        req.session.guestCart = {}
      }
      if (!req.session.itemsInOrder) {
        req.session.itemsInOrder = []
      }
      res.json(req.session)
    }
  } catch (err) {
    next(err)
  }
})

//api/orders/myCart
router.put('/myCart', async (req, res, next) => {
  try {
    await Order.update(
      {
        purchased: true
      },
      {
        where: {id: req.body.id},
        returning: true,
        plain: true
      }
    )
    res.send('Success')
  } catch (error) {
    next(error)
  }
})

router.put('/myCart/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const product = await Order.findById(orderId)
    console.log('-----------------------product.data: ', product.data)
    const updated = await product.update({
      numberOfItems: req.body.numberOfItems
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

//api/orders/mycart/:orderId
router.get('/myCart/:orderId', async (req, res, next) => {
  try {
    if (req.session.passport) {
      //the point of this route is to get the quantity of items in an order
      const orderItems = await ItemInOrder.findAll({
        //example: eager loading from above route tells you that you have dog sneakers in your cart, but not how many. this route returns ItemInOrder, which includes quantity and historical price information
        where: {
          orderId: req.params.orderId
        }
      })
      res.json(orderItems)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/myCart/newItem', async (req, res, next) => {
  try {
    console.log('req.body: ', req.body)
    const newItemInOrder = {
      productId: req.body[0].id,
      orderId: req.body[1],
      numberOfItems: Number(req.body[2]),
      purchaseTotal: req.body[0].price * req.body[2]
    }
    if (req.session.passport) {
      //if there is a logged in user, interact with database
      const orderItem = await ItemInOrder.find({
        where: {
          productId: req.body[0].id,
          orderId: req.body[1]
        }
      })
      if (!orderItem) {
        const newOrderItem = await ItemInOrder.create(newItemInOrder)
        res.json(newOrderItem)
      } else {
        res.json(orderItem)
      }
    } else if (
      req.session.itemsInOrder.some(
        //checking to see if the new item is already in our cart
        orderItem =>
          orderItem.productId === newItemInOrder.productId &&
          orderItem.orderId === newItemInOrder.orderId
      )
    ) {
      console.log(
        'this is where logic for increasing quantity or greying out add to cart button goes'
      )
    } else {
      req.session.itemsInOrder.push(newItemInOrder)
      res.json(newItemInOrder)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
