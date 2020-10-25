const { signup, login, remove } = require('../services/admin');

const adminSignup = (req, res, next) => {
    signup(req.body)
        .then(result => {
            const response = {
                admin: result.admin,
                token:result.token,
                success: true
            }
            res.status(201).json(response);
        })
        .catch(err => {
            next(err);
        });

}

const adminLogin = (req, res, next) => {
    login(req.body)
        .then(result => {
            const response = {
                token: result.token,
                data: result.admin,
                success: true
            }
            res.status(200).json(response)
        })
        .catch(err => {
            next(err)
        });
}

const deleteAdmin = (req, res, next) => {
    remove(req.params)
        .then(result => {
            const response = {
                message: "admin deleted",
                success: true
            }
            res.status(200).json(response);
        })
        .catch(err => {
            next(err)
        });
}
module.exports = { adminSignup, adminLogin, deleteAdmin };