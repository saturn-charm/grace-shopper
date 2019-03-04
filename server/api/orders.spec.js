/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const User = db.model('user')
const ItemInOrder = db.model('item-in-order')
const Product = db.model('product')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/orders/', () => {
    let product1, user1, itemInOrder1, order1
    const orderPurchased = false

    beforeEach(async () => {
      product1 = await Product.create({
        name: 'Hot Shoes',
        price: 9
      })

      user1 = await User.create({
        name: 'Cody',
        email: 'cody@puppybook.com'
      })

      order1 = await Order.create({
        purchased: orderPurchased,
        userId: user1.id
      })

      // itemInOrder1 = await ItemInOrder.create({
      //   numberOfItems: 1,
      //   purchaseTotal: 9,
      //   productId: product1.id,
      //   orderId: order1.id
      // })
    })

    it('GET /api/orders', async () => {
      const res = await request(app)
        .get('/api/orders')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].purchased).to.be.equal(orderPurchased)
    })
  }) // end describe('/api/orders')
}) // end describe('Order routes')
