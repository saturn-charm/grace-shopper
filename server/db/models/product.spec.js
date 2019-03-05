const {expect} = require('chai')
const should = require('chai').should()
const db = require('../index')
const Product = db.model('product')

describe('The Product model', () => {
  // clears the database and recreates the tables before beginning a run
  beforeEach(() => {
    return db.sync({force: true})
  })

  // creates an (un-saved) product instance before every spec
  let pupSneakers
  beforeEach(() => {
    pupSneakers = Product.build({
      name: 'Puppy Sneakers',
      description: 'For sporty dogs',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71Cf3MCaeaL._SX425_.jpg',
      stock: 15,
      price: 10
    })
  })

  // empty the test after each test
  afterEach(() => {
    return Promise.all([Product.truncate({cascade: true})])
  })

  describe('attributes definition', () => {
    it('includes `name`, `description`, `imageUrl`, `stock`, and `price` fields', async () => {
      describe('attribute definitions', () => {
        expect(pupSneakers.name).to.equal('Puppy Sneakers')
        pupSneakers.name.should.be.a('string')
        expect(pupSneakers.description).to.equal('For sporty dogs')
        pupSneakers.description.should.be.a('string')
        expect(pupSneakers.imageUrl).to.equal(
          'https://images-na.ssl-images-amazon.com/images/I/71Cf3MCaeaL._SX425_.jpg'
        )
        expect(pupSneakers.stock).to.equal(15)
        pupSneakers.stock.should.be.a('number')
        expect(pupSneakers.stock).to.equal(15)
      })

      describe('validations', () => {
        it('requires `name`', async () => {
          pupSneakers.name = null

          let result, error
          try {
            result = await pupSneakers.validate()
          } catch (err) {
            error = err
          }

          if (result) throw Error('validation should fail when name is null')
          expect(error).to.be.an.instanceOf(Error)
        })

        it('requires `price`', async () => {
          pupSneakers.price = null

          let result, error
          try {
            result = await pupSneakers.validate()
          } catch (err) {
            error = err
          }

          if (result) throw Error('validation should fail when price is null')
          expect(error).to.be.an.instanceOf(Error)
        })
      })
    })
  })
})
