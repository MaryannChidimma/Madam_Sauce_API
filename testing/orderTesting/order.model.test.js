const mongoose = require('mongoose')
const orderModel = require('../../api/models/orderSchema');

describe('order model', () => {
    describe('schema', () => {
        test('id', () => {
            const id = orderModel.schema.obj._id
            return expect(id).toEqual(mongoose.Schema.Types.ObjectId)
        })

        test('foodId', () => {
            const foodId = orderModel.schema.obj.foodId
            expect(foodId).toEqual({
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'kitchen_dbs', 
                required: true 
            })
        })

        test('foodId must be required', () => {
          expect(orderModel.schema.obj.foodId.required).toBeTruthy()
        })

        test('customerName', () => {
            const customerName = orderModel.schema.obj.customerName.required
            expect(customerName).toBeTruthy();
        })

      
    })
})