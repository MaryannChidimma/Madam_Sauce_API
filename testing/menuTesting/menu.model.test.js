const mongoose = require('mongoose')
const menuModel = require('../../api/models/menuSchema');

describe('menu model', () => {
    describe('schema', () => {
        test('id', () => {
            const id = menuModel.schema.obj._id
            return expect(id).toEqual(mongoose.Schema.Types.ObjectId)
        })

        test('name must be required', () => {
            const name = menuModel.schema.obj.name.required;
          expect(name).toBeTruthy()
        })

        test('price must be required', () => {
            const price= menuModel.schema.obj.price.required
            expect(price).toBeTruthy();
        })

      
    })
})