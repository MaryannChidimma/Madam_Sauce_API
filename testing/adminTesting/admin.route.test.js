const adminRoute = require('../../api/routes/admin');

describe('item router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/signup', method: 'post' },
      { path: '/login', method: 'post' },
      { path: '/:adminId', method: 'delete' }
    ]

    routes.forEach(route => {
      const match = adminRoute.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})