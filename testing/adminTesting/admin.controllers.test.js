const {...adminController} = require('../../api/controllers/admin');
const isFunction = require('../../utils/isFunction')

describe('item controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'adminSignup',
      'adminLogin',
      'deleteAdmin'
      ]

    crudMethods.forEach(name =>
      expect(isFunction(adminController[name])).toBe(true)
    )
  })
})

