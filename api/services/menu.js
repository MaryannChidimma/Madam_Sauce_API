const mongoose = require('mongoose');
const Menu = require('../models/menuSchema');

const getAllMenu = () => {
    return new Promise((resolve, reject) => {
        Menu.find()
            .select("name price _id")
            .exec()
            .then(docs => {
                resolve(docs)
            }).catch(err => {
                reject(err)
            })
    })
}

const getMenuById = (id) => {
    return new Promise((resolve, reject) => {
        Menu.findById(id)
            .exec()
            .then(doc => {
                resolve(doc)
            }).catch(err => {
                reject(err)
            })

    })

}

const createMenu = (data) => {
    const { category, name, price, quantity } = data;
    return new Promise((resolve, reject) => {
        const menu = new Menu({
            _id: mongoose.Types.ObjectId(),
            category: category,
            name: name,
            price: price,
            quantity: quantity
        });

        menu.save()
            .then(result => {
                resolve(result);
            }).catch(err => {
                reject(err)
            })

    })
}

const updateMenu = (id, data) => {
    const { category, name, price, quantity } = data;
    return new Promise((resolve, reject) => {
        Menu.findByIdAndUpdate(id, data, { new: true })
            .exec()
            .then(doc => {
                resolve(doc)
            }).catch(err => {
                reject(err)
            })
    });
}

const deleteMenu = (id) => {
    return new Promise((resolve, reject) => {
        Menu.remove({ _id: id })
            .exec()
            .then(doc => {
                resolve(doc);
            }).catch(err => {
                reject({ error: err })
            })

    })
}
module.exports = {
    getAllMenu,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
};

