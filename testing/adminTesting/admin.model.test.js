const mongoose = require('mongoose')
const adminModel = require('../../api/models/admin');

describe('admin model', () => {
    describe('schema', () => {
        test('id', () => {
            const id = adminModel.schema.obj._id
            return expect(id).toEqual(mongoose.Schema.Types.ObjectId)
        })

        test('email', () => {
            const email = adminModel.schema.obj.email
            expect(email).toEqual({
                type: String,
                required: true,
                unique: true,
                match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g
            })
        })

        test('email must be required', () => {
          expect(adminModel.schema.obj.email.required).toBeTruthy()
        })

        test('password', () => {
            const password = adminModel.schema.obj.password.required
            expect(password).toBeTruthy();
        })

      
    })
})