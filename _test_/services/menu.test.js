const { getAllMenu, getMenuById, createMenu} = require('../../api/services/menu')

describe('Get All Menu', () => {
    test('get all menu', async () => {
      const menu = await getAllMenu()
      expect(menu).toBeDefined();
    })
  });
