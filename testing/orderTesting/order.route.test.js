const orderRoute = require('../../api/routes/order');

describe('item router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'post' },
      { path: '/', method: 'get' },
      { path: '/:orderId', method: 'get' },
      { path: '/:orderId', method: 'delete' }
    ]

    routes.forEach(route => {
      const match = orderRoute.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})