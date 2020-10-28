const menuRoute = require('../../api/routes/menu');

describe('item router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'post' },
      { path: '/', method: 'get' },
      { path: '/:foodId', method: 'get'},
      { path: '/:foodId', method: 'put' },
      { path: '/:foodId', method: 'delete' }
    ]

    routes.forEach(route => {
      const match = menuRoute.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})