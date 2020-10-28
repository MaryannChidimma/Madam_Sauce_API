const {...menuController} = require('../../api/controllers/menu');
const isFunction = require('../../utils/isFunction')

describe('item controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
        'getAllMenuController',
        'getMenuByIdController',
        'createMenuController',
        'updateMenuController',
        'deleteMenuController'
      ]

    crudMethods.forEach(name =>
      expect(isFunction(menuController[name])).toBe(true)
    )
  })
})

