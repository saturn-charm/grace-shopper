const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'admin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
