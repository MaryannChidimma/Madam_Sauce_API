const {...orderController} = require('../../api/controllers/order');
const isFunction = require('../../utils/isFunction')

describe('item controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
        'getAllOrdersController', 
        'createOrderController',
        'getOrderByIdController',
        'deleteOrderController' 
      ]

    crudMethods.forEach(name =>
      expect(isFunction(orderController[name])).toBe(true)
    )
  })
})

