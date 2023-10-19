const {
    okResponse,
    serverErrorResponse,
    resMessage,
    notFoundResponse,
    errorResponse,
} = require('../helpers/response');
const menuModel = require('../models/menuModel');

const menuController = {};

menuController.getAll = async (req, res) => {
    try {
        const menus = await menuModel.getAll();

        return okResponse(res, menus);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

menuController.getOneById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return errorResponse(res, 'id is required');
        }

        const menu = await menuModel.getOneById(id);

        if (!menu || menu.length < 1) {
            return notFoundResponse(res);
        }

        return okResponse(res, menu[0]);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

menuController.create = async (req, res) => {
    try {
        const { item, price } = req.body;

        if (!item || !price) {
            return errorResponse(res, 'item and price is required');
        }

        await menuModel.create({ item, price });

        return okResponse(res, null, resMessage.CREATED);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

menuController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { item, price } = req.body;

        if (!item || !price) {
            return errorResponse(res, 'item and price is required');
        }

        const menus = await menuModel.update(id, { item, price });

        return okResponse(res, menus, resMessage.UPDATED);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

menuController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return errorResponse(res, 'id is required');
        }

        const menu = await menuModel.getOneById(id);

        if (!menu || menu.length < 1) {
            return notFoundResponse(res);
        }

        await menuModel.delete(id);

        return okResponse(res, null, resMessage.DELETED);
    } catch (err) {
        return serverErrorResponse(res, err.message);
    }
};

module.exports = menuController;
