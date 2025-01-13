const ordersRouter = require('./orders')
const productsRouter = require('./products')
const usersRouter = require('./users')
function route(app) {
     //local host --- Hosting
//action ---> Dispatcher ---> Function handler
    app.use('/orders', ordersRouter )
    app.use('/products', productsRouter)
    app.use('/users', usersRouter)
}

module.exports = route;