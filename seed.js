const db = require('./server/db/db')

const User = require('./server/db/models/user')
const Product = require('./server/db/models/product')

const seed = async () => {
  await db.sync({force: true})
  const [
    fallMittens,
    summerMittens,
    springMittens,
    winterMittens
  ] = await Promise.all([
    Product.create({
      name: 'Fall Mittens',
      imageUrl:
        'https://thumbs.dreamstime.com/z/dog-s-shoe-tripping-untied-35441924.jpg',
      description:
        'Spicy jalapeno bacon ipsum dolor amet filet mignon velit swine veniam.',
      stock: 0,
      price: 0
    }),
    Product.create({
      name: 'Summer Mittens',
      imageUrl:
        'https://thumbs.dreamstime.com/z/dog-s-shoe-tripping-untied-35441924.jpg',
      description:
        'Spicy jalapeno bacon ipsum dolor amet filet mignon velit swine veniam.',
      stock: 0,
      price: 0
    }),
    Product.create({
      name: 'Spring Mittens',
      imageUrl:
        'https://thumbs.dreamstime.com/z/dog-s-shoe-tripping-untied-35441924.jpg',
      description:
        'Spicy jalapeno bacon ipsum dolor amet filet mignon velit swine veniam.',
      stock: 0,
      price: 0
    }),
    Product.create({
      name: 'Winter Mittens',
      imageUrl:
        'https://thumbs.dreamstime.com/z/dog-s-shoe-tripping-untied-35441924.jpg',
      description:
        'Spicy jalapeno bacon ipsum dolor amet filet mignon velit swine veniam.',
      stock: 0,
      price: 0
    })
  ])

  const [user1, user2, user3] = await Promise.all([
    User.create({
      name: 'user1',
      email: 'babyteeth1@hmail.com',
      password: '12345'
    }),
    User.create({
      name: 'user2',
      email: 'babyteeth2@hmail.com',
      password: '123'
    }),
    User.create({
      name: 'user3',
      email: 'babyteeth3@hmail.com',
      password: '1234'
    })
  ])
  console.log('Seeding success!')
  db.close()
}

seed().catch(err => {
  console.error('On noes!')
  console.error(err)
  db.close()
})
