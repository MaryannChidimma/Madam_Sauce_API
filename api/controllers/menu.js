//const menu = require('../services/menu')
const {
    getAllMenu,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu } = require('../services/menu')

const getAllMenuController = (req, res, next) => {
    getAllMenu()
        .then(result => {
            const response = {
                count: result.length,
                menus: result,
                success: true
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err, success: false })
        })
}

const getMenuByIdController = (req, res, next) => {
    const id = req.params.foodId;
    getMenuById(id)
        .then(result => {
            const response = {
                menu: result,
                success: true
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err, success: false })
        });
}

const createMenuController = (req, res, next) => {
    createMenu(req.body)
        .then(response => {
            console.log(response);
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json(error);
        });
}

const updateMenuController = (req, res, next) => {
    const id = req.params.foodId;
    const data = req.body
    updateMenu(id, data)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error);
        });
}
const deleteMenuController = (req, res, next) => {
    const id = req.params.foodId;
    deleteMenu(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json(error);
        });

}

module.exports = {
    getAllMenuController
    , getMenuByIdController,
    createMenuController,
    updateMenuController,
    deleteMenuController
};