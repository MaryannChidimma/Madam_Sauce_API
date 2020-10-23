
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
        .then(result => {
            const response = {
                createdProperty: result,
                success: true
            }
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err, success: false });
        });
}

const updateMenuController = (req, res, next) => {
    const id = req.params.foodId;
    const data = req.body
    updateMenu(id, data)
        .then(result => {
            const response = {
                menu: result,
                success: true
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: err, success: false });
        });
}
const deleteMenuController = (req, res, next) => {
    const id = req.params.foodId;
    deleteMenu(id)
        .then(result => {
            const response = {
                message: "menu deleted",
                success: true
            }
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({ error: err, success: false });
        });

}

module.exports = {
    getAllMenuController,
    getMenuByIdController,
    createMenuController,
    updateMenuController,
    deleteMenuController
};