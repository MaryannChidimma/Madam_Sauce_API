const mongoose = require('mongoose');
const Menu = require('../models/menuSchema');

const getAllMenu = () => {
    return new Promise((resolve, reject) => {
        Menu.find()
            .select("name price _id")
            .exec()
            .then(docs => {
                console.log(docs);
                const response = {
                    count: docs.length,
                    menus: docs.map(doc => {
                        return {
                            name: doc.name,
                            price: doc.price,
                            _id: doc._id,
                        }
                    })
                }
                resolve(response)
            }).catch(err => {
                reject({ error: err })
            })
    })
}

const getMenuById = (id) => {
    return new Promise((resolve, reject) => {
        Menu.findById(id)
            .exec()
            .then(doc => {
                console.log(doc)
                const result = {
                    menu: doc,

                }
                resolve(result)
            }).catch(err => {
                reject({ error: err })
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
               const createdProperty = {
                    name: result.name,
                    price: result.price,
                    quantity: result.quantity,
                    _id: result._id,
                }
                resolve(createdProperty);
            }).catch(err => {
                reject({ error: err })
            })

    })
}

const updateMenu = (id, data) => {
    const { category, name, price, quantity } = data;
   
   return new Promise((resolve, reject)=>{
     
    Menu.updateOne({_id:id}, data)
        .exec()
        .then(doc => {
            const response = await getMenuById(id) 
             response = {...response}   
            
            
          const response = {
                menu: doc,
                request: {
                    type: 'GET',
                    description: 'GET_ALL_MENU',
                    url: "http://localhost:5000/menu"
                }
             }
            
            resolve(response)
        }).catch(err => {
         reject({ error: err })
        })

    });  
}

const deleteMenu = (id) => {
    return new Promise((resolve, reject) => {
        Menu.remove({ _id: id })
            .exec()
            .then(result => {
                const response = {
                    message: "menu deleted",
                }
                resolve(response);
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

