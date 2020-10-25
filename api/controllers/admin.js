const mongoose = require('mongoose')
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const adminSignup = (req, res, next) => {
    Admin.find({ email: req.body.email })
        .then(admin => {
            if (admin.length >= 1) {
                return res.status(422).json({ message: 'email exists', success: false })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: err, success: false });

                    } else {

                        const admin = new Admin({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        admin.save()
                            .then(result => {

                                res.status(201).json({ message: 'admin created sucessfully', admin: result, success: true });
                            })
                            .catch(err => {
                                res.status(500).json({ error: err, success: false })
                            });

                    }
                })

            }
        })

}

const adminLogin = (req, res, next) => {
    Admin.find({ email: req.body.email })
        .exec()
        .then(admin => {
            if (admin.length < 1) {
                return res.status(401).json({ message: "Authentication failed", success: false })
            }
            bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({ message: "Authentication failed", success: false })
                }

                if (result) {
                    token = jwt.sign({
                        email: admin[0].email,
                        admin_Id: admin[0]._Id
                    },

                        process.env.JWT_KEY,

                        { expiresIn: '1h' }
                    )
                    return res.status(200).json({ message: "Authentication successful", token: token, success: true })
                }
                return res.status(401).json({ message: "Authentication failed", success: false })
            })

        })
        .catch(err => {
            res.status(500).json({ error: err, success: false });
        })

}

const deleteAdmin = (req, res, next) => {
    Admin.remove({ _id: req.params.adminId })
        .exec()
        .then(result => {
            res.status(200).json({ message: " admin deleted  successfully", success: true })
        })
        .catch(err => {
            res.status(500).json({ error: err, success: false });
        })
}

module.exports = { adminSignup, adminLogin, deleteAdmin };