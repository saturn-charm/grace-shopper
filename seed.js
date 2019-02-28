const db = require('./server/db/db')

const {User} = require('./server/db/models')
const {Product} = require('./server/db/models')
const {Order} = require('./server/db/models')
const {ItemInOrder} = require('./server/db/models')

const seed = async () => {
  await db.sync({force: true})
  const [Galoshes, Sneaks, springMittens, winterMittens] = await Promise.all([
    Product.create({
      // gategory: 'Summer Mittens',
      name: 'Galoshes',
      imageUrl:
        'http://www.careyfashion.com/fashion/wp-content/uploads/2016/12/dog-shoes-7.jpg',
      description: "For those times when you don't want your feets to get wet.",
      stock: 5,
      price: 18
    }),
    Product.create({
      // gategory: 'Summer Mittens',
      name: 'Sneaks',
      imageUrl:
        'https://cdn10.bigcommerce.com/s-5o6frrlm/products/28039/images/85279/Reflectorboots__96681.1439406820.450.650.jpg?c=2',
      description: 'For those cool kids on the block.',
      stock: 5,
      price: 25
    }),
    Product.create({
      // gategory: 'Summer Mittens',
      name: 'Galoshes 2.0',
      imageUrl:
        'https://cdn3.volusion.com/ykjvc.jwfnz/v/vspfiles/photos/PAWZB-5.jpg?1450092500',
      description: 'Rainy days, go away!',
      stock: 5,
      price: 20
    }),
    Product.create({
      // gategory: 'Summer Mittens',
      name: 'Princess Sandals',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB15tRJRVXXXXbOaXXXq6xXFXXXS/Summer-Autumn-Tiny-Cute-Shoes-for-dogs-Pet-Anti-Slip-Shoes-for-Chihuahua-PU-dog-shoes.jpg_640x640.jpg',
      description: 'For those who are too cool for school.',
      stock: 5,
      price: 30
    }),
    Product.create({
      // gategory: 'Spring Mittens',
      name: 'Sneaks 2.0',
      imageUrl: 'https://s.hswstatic.com/gif/dog-boots-diy-pattern0-1.jpg',
      description: 'For the coolest of cool kids.',
      stock: 4,
      price: 30
    }),
    Product.create({
      // gategory: 'Spring Mittens',
      name: 'Velcro',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1VmVSRXXXXXbWaXXXq6xXFXXXM/4Pcs-Set-Pet-Shoes-Dog-Shoes-Winter-Pet-Dog-Waterproof-Boots-Protective-Rubber-Rain-Shoes-Black.jpg_640x640.jpg',
      description: 'Velcro is for winners.',
      stock: 4,
      price: 25
    }),
    Product.create({
      // gategory: 'Spring Mittens',
      name: 'Everyday Mitten',
      imageUrl:
        'https://images.baxterboo.com/global/images/products/large/pawz-disposable-dog-booties-12pk-small-red-1.jpg',
      description: 'The everyday mitten.',
      stock: 4,
      price: 18
    }),
    Product.create({
      // gategory: 'Spring Mittens',
      name: 'Galoshes-tall',
      imageUrl:
        'https://topdogtips.com/wp-content/uploads/2017/02/best-waterproof-dog-boots.jpg',
      description: 'For those smaller tall dogs.',
      stock: 4,
      price: 25
    }),
    Product.create({
      // gategory: 'Fall Mittens',
      name: 'Fall Mittens',
      imageUrl:
        'https://www.k9ofmine.com/wp-content/uploads/2017/06/best-dog-booties-e1528318545334.jpg',
      description: 'For those smaller tall dogs.',
      stock: 0,
      price: 0
    }),
    Product.create({
      // gategory: 'Fall Mittens',
      name: 'Fall Mittens',
      imageUrl:
        'https://topdogtips.com/wp-content/uploads/2016/03/Best-Dog-Booties-Best-Dog-Boots-for-Dogs-That-Stay-On.jpg',
      description: 'For those smaller tall dogs.',
      stock: 0,
      price: 0
    }),
    Product.create({
      // gategory: 'Fall Mittens',
      name: 'Fall Mittens',
      imageUrl:
        'https://www.certapet.com/wp-content/uploads/2018/08/white-puppy-wearing-dog-socks-and-dog-booties-dog-rain-boots-in-the-rainy-weather.jpg',
      description: 'For those smaller tall dogs.',
      stock: 0,
      price: 0
    }),
    Product.create({
      // gategory: 'Fall Mittens',
      name: 'Fall Mittens',
      imageUrl:
        'https://www.unleashedlife.com/wp-content/uploads/2018/05/Wagwellies_008-600x600.jpg',
      description: 'For those smaller tall dogs.',
      stock: 0,
      price: 0
    }),
    Product.create({
      // gategory: 'Winter Mittens',
      name: 'Winter Mittens',
      imageUrl:
        'https://www.bedandbiscuitaustin.com/wp-content/uploads/2017/11/Paw-Protection.jpg',
      description: 'For those smaller tall dogs.',
      stock: 0,
      price: 0
    }),
    Product.create({
      // gategory: 'Winter Mittens',
      name: 'Winter Mittens',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71Cf3MCaeaL._SX425_.jpg',
      description: 'For those smaller tall dogs.',
      stock: 0,
      price: 0
    }),
    Product.create({
      // gategory: 'Winter Mittens',
      name: 'Winter Mittens',
      imageUrl:
        'https://ae01.alicdn.com/kf/HTB1RRB4OVXXXXckXXXXq6xXFXXXn/4pcs-set-Dog-Pet-Boots-Silica-Gel-Waterproof-Pet-Shoes-Outdoor-Rain-Cover-For-Yorkie-Teddy.jpg_640x640.jpg',
      description: 'For those smaller tall dogs.',
      stock: 0,
      price: 0
    }),
    Product.create({
      // gategory: 'Winter Mittens',
      name: 'Winter Mittens',
      imageUrl:
        'http://barkandswagger.com/wp-content/uploads/2014/11/Paws-Jawz-Piranha-Banana-PB-Boots-Feb2014-00.jpg',
      description: 'For those smaller tall dogs.',
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

  const [order1, order2, order3] = await Promise.all([
    Order.create({
      purchased: false,
      userId: user1.id
    }),
    Order.create({
      purchased: false,
      userId: user2.id
    }),
    Order.create({
      purchased: false,
      userId: user3.id
    })
  ])

  const [item1, item2, item3, item4, item5, item6] = await Promise.all([
    ItemInOrder.create({
      numberOfItems: 1,
      purchaseTotal: 0,
      productId: Galoshes.id,
      orderId: order1.id
    }),
    ItemInOrder.create({
      numberOfItems: 1,
      purchaseTotal: 0,
      productId: Sneaks.id,
      orderId: order2.id
    }),
    ItemInOrder.create({
      numberOfItems: 1,
      purchaseTotal: 0,
      productId: springMittens.id,
      orderId: order3.id
    }),
    ItemInOrder.create({
      numberOfItems: 1,
      purchaseTotal: 0,
      productId: winterMittens.id,
      orderId: order1.id
    }),
    ItemInOrder.create({
      numberOfItems: 1,
      purchaseTotal: 0,
      productId: Galoshes.id,
      orderId: order2.id
    }),
    ItemInOrder.create({
      numberOfItems: 1,
      purchaseTotal: 0,
      productId: Sneaks.id,
      orderId: order3.id
    })
  ])
  //
  // const [singleProduct] = await Promise.all({
  //
  // })
  console.log('Seeding success!')
  db.close()
}

seed().catch(err => {
  console.error('On noes!')
  console.error(err)
  db.close()
})
