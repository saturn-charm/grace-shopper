const router = require('express').Router()
const {ItemInOrder} = require('../db/models')

const makeError = (status, message) => {
  const err = new Error(message)
  err.status = status
  return err
}
const isAdmin = (req, res, next) => {
  // let isAdmin = req.user.admin ? true : false ;
  let isAdmin = req.user ? req.user.admin : false
  if (!isAdmin) return next(makeError(403, 'Forbidden'))
  next()
}

// api/itemsInOrder/:productId
router.get('/:productId', isAdmin, async (req, res, next) => {
  try {
    const productId = req.params.productId
    const response = await ItemInOrder.findById(productId)
    res.json(response)
  } catch (err) {
    next(err)
  }
})

module.exports = router
