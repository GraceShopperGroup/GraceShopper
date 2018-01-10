const chance = require('chance')(123);
const Promise = require('bluebird');

const db = require('../server/db')
const { User, Product, Order, OrderProduct, Review } = require('../server/db/models');

const numUsers = 10;
const numProducts = 10;
const numOrders = 10;

const emails = ['shayan', 'james', 'jimmi', 'sam', 'leigh',
  'bryan', 'abe', 'owen', 'vinit', 'shannen'];

function doTimes (n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

//RAND MAKER
function randUser () {
  return User.build({
    email: emails.pop()+'@gmail.com',
    password: chance.word()
  });
}

function randName () {
  const numWords = chance.natural({
    min: 1,
    max: 3
  });
  return chance.sentence({words: numWords})
  .replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  })
  .slice(0, -1);
}

var sneakers = ['Adidas', 'Nike', 'Converse', 'Puma', 'Yeezy', 
        'Jordans', 'Doc Martens', 'Colt 45s', '2 Zigzags', 'Toms']
function randProduct () {
  const numPars = chance.natural({
    min: 1,
    max: 2
  });
  return Product.build({
    name: sneakers.pop(),
    price: chance.integer({ min: 0, max: 1000 }),
    description: randName(),
    invenQuant: chance.integer({ min: 0, max: 10 }),
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Black_Converse_sneakers.JPG/1200px-Black_Converse_sneakers.JPG"
  });
}

function randOrder (createdUsers) {
  const user = chance.pick(createdUsers)
  return Order.build({
    userId: user.id
  });
}

function randOrderProduct (createdProducts, createdOrders) {
  const product = chance.pick(createdProducts)
  const order = chance.pick(createdOrders)
  return OrderProduct.build({
    productId: product.id,
    orderId: order.id,
    priceAtPurchase: product.price,
    quantity: chance.integer({ min: 1, max: 4 })
  })
}

//GENERATE RAND
function generateUsers () {
  const users = doTimes(numUsers, randUser);
  users.push(User.build({
    email: 'zeke@zeke.zeke',
    password: '123',
    isAdmin: true
  }));
  users.push(User.build({
    email: 'omri@omri.omri',
    password: '123',
    isAdmin: true
  }));
  users.push(User.build({
    email: 'kate@kate.kate',
    password: '7890',
    isAdmin: true
  }));
  return users;
}

function generateProducts () {
  return doTimes(numProducts, () => randProduct());
}

function generateOrders (createdUsers) {
  return doTimes(numOrders, () => randOrder(createdUsers));
}

function generateOrderProducts (createdProducts, createdOrders) {
  return doTimes(numOrders, () => randOrderProduct(createdProducts, createdOrders));
}


//SAVE CREATED STUFF
function createUsers () {
  return Promise.map(generateUsers(), user => user.save());
}

function createProducts () {
  return Promise.map(generateProducts(), product => product.save());
}

function createOrders (createdUsers) {
  return Promise.map(generateOrders(createdUsers), order => order.save());
}

function createOrderProducts (createdProducts, createdOrders) {
  return Promise.map(generateOrderProducts(createdProducts, createdOrders), orderProd => orderProd.save());
}

function seed () {
  return createUsers()
  .then(createdUsers => createOrders(createdUsers))
  .then(orders => {
    createdOrders = orders
    return createProducts()
  })
  .then(createdProducts => createOrderProducts(createdProducts, createdOrders)); 
}

console.log('Syncing database');

db.sync({force: true})
  .then(() => {
    console.log('Seeding database');
    return seed();
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    db.close();
    return null;
  })