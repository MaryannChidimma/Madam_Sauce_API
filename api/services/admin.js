const mongoose = require('mongoose')
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const signup = (data) => {
    const { email, password } = data
    return new Promise((resolve, reject) => {
        Admin.find({ email: email })
            .then(admin => {
                if (admin.length >= 1) {
                    const err = new Error('email already exists');
                    err.status = 422;
                    return reject(err);
                }
                else {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) return reject(err);

                        const admin = new Admin({
                            _id: mongoose.Types.ObjectId(),
                            email: email,
                            password: hash
                        })
                        admin.save()
                            .then(result => {
                                return resolve(result);
                            })
                            .catch(err => {
                                return reject(err);
                            });

                    })

                }
            });
    });
}

const login = (data) => {
    const { email, password } = data;
    return new Promise((resolve, reject) => {
        Admin.findOne({ email: email })
            .exec()
            .then(admin => {
                if (!admin) {
                    const err = new Error('email does not exist');
                    err.status = 404;
                    return reject(err);
                }
                bcrypt.compare(password, admin.password, (err, isMatch) => {
                    if (err) {
                        return reject(err)
                    }
                    if (isMatch) {
                        const token = generateJwtToken(admin.email, admin._Id)
                        return resolve({ token: token, admin: admin });
                    } else {
                        const err = new Error('password is incorrect');
                        err.status = 401;
                        return reject(err)
                    }

                })
            })
            .catch(err => {
                reject(err);
            })
    })
}

const generateJwtToken = (email, id) => {
    return jwt.sign({
        email: email,
        admin_Id: id
    },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
    );
}
const remove = (data) => {
    const { adminId } = data
    return new Promise((resolve, reject) => {
        Admin.remove({ _id: adminId })
            .exec()
            .then(result => {
                resolve(result)
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = { signup, login, remove };