const chance = require('chance')(123);
const Promise = require('bluebird');

const db = require('../server/db')
const { User, Product, Order, OrderProduct, Review, Category, ProductCategory } = require('../server/db/models');

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
function randProduct() {
  return Product.build({
    name: sneakers.pop(),
    price: chance.integer({ min: 0, max: 1000 }),
    description: randName(),
    inventoryQuant: chance.integer({ min: 0, max: 10 }),
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Black_Converse_sneakers.JPG/1200px-Black_Converse_sneakers.JPG",
  });
}

function randOrder (createdUsers) {
  const user = chance.pick(createdUsers)
  return Order.build({
    userId: user.id
  });
}

const orderProducts = [
  { orderId: 1, productId: 1, quantity: 1 },
  { orderId: 1, productId: 4, quantity: 2 },
  { orderId: 2, productId: 3, quantity: 5 },
  { orderId: 3, productId: 3, quantity: 1 },
  { orderId: 5, productId: 6, quantity: 3 },
  { orderId: 6, productId: 4, quantity: 2 }
]

const productCategories = [
  { productId: 1, categoryId: 1 },
  { productId: 2, categoryId: 2 },
  { productId: 3, categoryId: 3 },
  { productId: 4, categoryId: 1 },
  { productId: 5, categoryId: 1 },
  { productId: 6, categoryId: 3 },
  { productId: 7, categoryId: 1 },
  { productId: 8, categoryId: 1 },
  { productId: 9, categoryId: 2 },
  { productId: 10, categoryId: 3 },
]

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

function generateProducts() {
  return doTimes(numProducts, () => randProduct());
}

function generateOrders (createdUsers) {
  return doTimes(numOrders, () => randOrder(createdUsers));
}

function generateOrderProducts (createdProducts) {
  return orderProducts.map(orderProd => {
    let product = createdProducts.find(prod => prod.id === orderProd.productId);
    orderProd.priceAtPurchase = product.price;
    return OrderProduct.build(orderProd)
  });
}

function generateProductCat () {
  return productCategories.map(prodCat => ProductCategory.build(prodCat))
}

const categories = ['sneakers', 'boots', 'sandals'];

function generateCategories () {
  return doTimes(categories.length, () => Category.build({ name: categories.pop() }))
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

function createOrderProducts (createdProducts) {
  return Promise.map(generateOrderProducts(createdProducts), orderProd => orderProd.save());
}

function createCategories () {
  return Promise.map(generateCategories(), category => category.save());
}

function createProductCategories () {
  return Promise.map(generateProductCat(), prodCat => prodCat.save());
}

function seed () {
  return Promise.all( [createCategories(), createUsers(), createProducts()] )
    .then( ([createdCategories, createdUsers, createdProducts]) => {
      return createOrders(createdUsers)
      .then(() => createOrderProducts(createdProducts))
      .then(() => createProductCategories())
      .catch(err => console.log(err));
    })
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
